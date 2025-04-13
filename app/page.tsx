'use client'

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SetupBuilder from "@/components/setup-builder"
import ComparisonTable from "@/components/comparison-table"
import { type Setup, calculateTotalStats } from "@/lib/calculator"
import runeData from "@/data/rune.json"
import runeStoneData from "@/data/rune_stone.json"
import runeAuraData from "@/data/rune_aura.json"
import adventureClassData from "@/data/adventure_class.json"
import statData from "@/data/stat.json"

export default function GameCalculator() {
  const [setups, setSetups] = useState<Setup[]>([
    { id: 1, name: "Setup 1", runes: [], classes: [], totalStats: {} },
    { id: 2, name: "Setup 2", runes: [], classes: [], totalStats: {} },
    { id: 3, name: "Setup 3", runes: [], classes: [], totalStats: {} },
  ])
  const [activeTab, setActiveTab] = useState("setup-1")
  const [showComparison, setShowComparison] = useState(false)

  // Update total stats whenever a setup's runes or classes change
  useEffect(() => {
    const updatedSetups = setups.map(setup => ({
      ...setup,
      totalStats: calculateTotalStats(setup.runes, setup.classes, runeAuraData, adventureClassData)
    }))
    
    // Only update state if there's an actual change to prevent infinite loops
    const hasChanged = JSON.stringify(updatedSetups) !== JSON.stringify(setups);
    if (hasChanged) {
      setSetups(updatedSetups);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(setups.map(s => ({
    runes: s.runes.map(r => r["Rune Name"]),
    classes: s.classes
  })))]);

  const updateSetup = (setupId: number, updatedSetup: Partial<Setup>) => {
    setSetups((prevSetups) => prevSetups.map((setup) => (setup.id === setupId ? { ...setup, ...updatedSetup } : setup)))
  }

  const resetSetup = (setupId: number) => {
    setSetups((prevSetups) =>
      prevSetups.map((setup) => (setup.id === setupId ? { ...setup, runes: [], classes: [], totalStats: {} } : setup)),
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Elemental 2D Compare Tool</CardTitle>
          <CardDescription>Create up to 3 different setups and compare their stats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Select runes (max 6 per setup) and classes to build your character.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant={showComparison ? "default" : "outline"} onClick={() => setShowComparison(true)}>
                Compare Setups
              </Button>
              <Button variant={!showComparison ? "default" : "outline"} onClick={() => setShowComparison(false)}>
                Build Setups
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showComparison ? (
        <ComparisonTable setups={setups} statList={statData.map((s) => s.Stat)} />
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="setup-1">Setup 1</TabsTrigger>
            <TabsTrigger value="setup-2">Setup 2</TabsTrigger>
            <TabsTrigger value="setup-3">Setup 3</TabsTrigger>
          </TabsList>

          {setups.map((setup) => (
            <TabsContent key={setup.id} value={`setup-${setup.id}`}>
              <SetupBuilder
                setup={setup}
                updateSetup={(updatedSetup) => updateSetup(setup.id, updatedSetup)}
                resetSetup={() => resetSetup(setup.id)}
                runeData={runeData}
                runeStoneData={runeStoneData}
                adventureClassData={adventureClassData}
              />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}