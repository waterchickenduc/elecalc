"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'
import type { Setup } from "@/lib/calculator"
import RuneSelector from "./rune-selector"
import ClassSelector from "./class-selector"
import StatsDisplay from "./stats-display"

interface SetupBuilderProps {
  setup: Setup
  updateSetup: (updatedSetup: Partial<Setup>) => void
  resetSetup: () => void
  runeData: any[]
  runeStoneData: any[]
  adventureClassData: any
}

export default function SetupBuilder({
  setup,
  updateSetup,
  resetSetup,
  runeData,
  runeStoneData,
  adventureClassData,
}: SetupBuilderProps) {
  const [activeTab, setActiveTab] = useState("runes")

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSetup({ name: e.target.value })
  }

  const handleAddRune = (rune: any) => {
    if (setup.runes.length >= 6) return
    // Remove the check that prevents adding the same rune multiple times

    updateSetup({
      runes: [...setup.runes, rune],
    })
  }

  // Update the handleRemoveRune function to remove only one instance of the rune
  const handleRemoveRune = (runeName: string) => {
    const runeIndex = setup.runes.findIndex((rune) => rune["Rune Name"] === runeName)
    if (runeIndex !== -1) {
      const newRunes = [...setup.runes]
      newRunes.splice(runeIndex, 1)
      updateSetup({
        runes: newRunes,
      })
    }
  }

  const handleToggleClass = (className: string) => {
    const isSelected = setup.classes.includes(className)

    if (isSelected) {
      updateSetup({
        classes: setup.classes.filter((c) => c !== className),
      })
    } else {
      updateSetup({
        classes: [...setup.classes, className],
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Build Your Setup</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Select runes and classes to create your setup</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetSetup}>
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor={`setup-name-${setup.id}`}>Setup Name</Label>
              <Input id={`setup-name-${setup.id}`} value={setup.name} onChange={handleNameChange} className="mt-1" />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="runes">Runes</TabsTrigger>
                <TabsTrigger value="classes">Classes</TabsTrigger>
              </TabsList>

              <TabsContent value="runes">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Selected Runes ({setup.runes.length}/6)</h3>
                  </div>

                  {setup.runes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {/* Group runes by name and count them */}
                      {Object.entries(
                        setup.runes.reduce((acc: Record<string, any[]>, rune) => {
                          const name = rune["Rune Name"]
                          if (!acc[name]) acc[name] = []
                          acc[name].push(rune)
                          return acc
                        }, {}),
                      ).map(([runeName, runes]) => (
                        <div key={runeName} className="flex items-center justify-between p-2 border rounded-md">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{runeName}</p>
                              {runes.length > 1 && (
                                <Badge variant="secondary" className="text-xs">
                                  ×{runes.length}
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {["Rune 1 ", "Rune 2", "Rune 3", "Rune 4"].map((runeKey) =>
                                runes[0][runeKey] && runes[0][runeKey] !== "0%" ? (
                                  <Badge key={runeKey} variant="outline" className="text-xs">
                                    {runes[0][runeKey]}
                                  </Badge>
                                ) : null,
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveRune(runeName)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mb-4">No runes selected yet</p>
                  )}

                  <Separator className="my-4" />

                  <RuneSelector
                    runeData={runeData}
                    selectedRunes={setup.runes.map((r) => r["Rune Name"])}
                    onSelectRune={handleAddRune}
                  />
                </div>
              </TabsContent>

              <TabsContent value="classes">
                <ClassSelector
                  adventureClassData={adventureClassData}
                  selectedClasses={setup.classes}
                  onToggleClass={handleToggleClass}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div>
        <StatsDisplay setup={setup} />
      </div>
    </div>
  )
}