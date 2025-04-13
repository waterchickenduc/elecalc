"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Setup } from "@/lib/calculator"
import { parsePercentage } from "@/lib/calculator"

interface ComparisonTableProps {
  setups: Setup[]
  statList: string[]
}

export default function ComparisonTable({ setups, statList }: ComparisonTableProps) {
  // Filter out stats that have no values across all setups
  const relevantStats = statList.filter((stat) =>
    setups.some((setup) => setup.totalStats[stat] && setup.totalStats[stat] !== 0 && setup.totalStats[stat] !== "0%"),
  )

  // Function to determine if a value is the highest among all setups for a given stat
  const isHighestValue = (stat: string, setupId: number): boolean => {
    const currentValue = parsePercentage(setups.find((s) => s.id === setupId)?.totalStats[stat] || "0%")

    for (const setup of setups) {
      if (setup.id !== setupId) {
        const otherValue = parsePercentage(setup.totalStats[stat] || "0%")
        if (otherValue > currentValue) {
          return false
        }
      }
    }

    // Only return true if the value is actually greater than zero
    return currentValue > 0
  }

  // Function to determine if a value is the lowest among all setups for a given stat
  const isLowestValue = (stat: string, setupId: number): boolean => {
    const currentValue = parsePercentage(setups.find((s) => s.id === setupId)?.totalStats[stat] || "0%")

    // If the value is zero or doesn't exist, don't highlight it as lowest
    if (currentValue === 0) return false

    let hasOtherNonZeroValues = false

    for (const setup of setups) {
      if (setup.id !== setupId) {
        const otherValue = parsePercentage(setup.totalStats[stat] || "0%")
        if (otherValue > 0) {
          hasOtherNonZeroValues = true
          if (otherValue < currentValue) {
            return false
          }
        }
      }
    }

    // Only return true if there are other non-zero values to compare with
    return hasOtherNonZeroValues
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Setup Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Stat</TableHead>
                {setups.map((setup) => (
                  <TableHead key={setup.id}>{setup.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {relevantStats.map((stat) => (
                <TableRow key={stat}>
                  <TableCell className="font-medium">{stat}</TableCell>
                  {setups.map((setup) => {
                    const isHighest = isHighestValue(stat, setup.id)
                    const isLowest = isLowestValue(stat, setup.id)

                    return (
                      <TableCell
                        key={`${setup.id}-${stat}`}
                        className={isHighest ? "text-green-600 font-medium" : isLowest ? "text-red-600" : ""}
                      >
                        {setup.totalStats[stat] || "0%"}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}