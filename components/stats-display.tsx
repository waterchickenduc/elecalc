"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Setup } from "@/lib/calculator"

interface StatsDisplayProps {
  setup: Setup
}

export default function StatsDisplay({ setup }: StatsDisplayProps) {
  const { totalStats } = setup

  // Get all stat keys that have non-zero values
  const relevantStats = Object.entries(totalStats)
    .filter(([_, value]) => value !== 0 && value !== "0%")
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Stats Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {relevantStats.length > 0 ? (
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-2">
              {relevantStats.map(([stat, value]) => (
                <div key={stat} className="flex justify-between items-center py-1 border-b">
                  <span className="font-medium">{stat}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-sm text-muted-foreground">No stats to display. Add runes and classes to see stats.</p>
        )}
      </CardContent>
    </Card>
  )
}