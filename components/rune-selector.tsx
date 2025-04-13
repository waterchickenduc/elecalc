"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from 'lucide-react'

interface RuneSelectorProps {
  runeData: any[]
  selectedRunes: string[]
  onSelectRune: (rune: any) => void
}

export default function RuneSelector({ runeData, selectedRunes, onSelectRune }: RuneSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRunes = runeData.filter((rune) => rune["Rune Name"].toLowerCase().includes(searchTerm.toLowerCase()))

  // Count how many times each rune is selected
  const runeCount: Record<string, number> = {}
  selectedRunes.forEach((runeName) => {
    runeCount[runeName] = (runeCount[runeName] || 0) + 1
  })

  return (
    <div>
      <div className="mb-4">
        <Input placeholder="Search runes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="grid grid-cols-1 gap-3">
          {filteredRunes.map((rune) => {
            const count = runeCount[rune["Rune Name"]] || 0
            const isDisabled = selectedRunes.length >= 6 && count === 0

            return (
              <Card key={rune["Rune Name"]} className={`${count > 0 ? "bg-muted" : ""}`}>
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{rune["Rune Name"]}</h4>
                        {count > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            ×{count}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {["Rune 1 ", "Rune 2", "Rune 3", "Rune 4"].map((runeKey) =>
                          rune[runeKey] && rune[runeKey] !== "0%" ? (
                            <Badge key={runeKey} variant="outline" className="text-xs">
                              {rune[runeKey]}
                            </Badge>
                          ) : null,
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                        {Object.entries(rune).map(([key, value]) => {
                          if (["Rune Name", "Rune 1 ", "Rune 2", "Rune 3", "Rune 4"].includes(key)) return null
                          if (value === "0%" || value === "0" || value === "none" || value === "0%") return null

                          return (
                            <div key={key} className="text-xs">
                              <span className="font-medium">{key}:</span> {value}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <Button variant="ghost" size="icon" disabled={isDisabled} onClick={() => onSelectRune(rune)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}