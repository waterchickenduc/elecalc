"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight } from 'lucide-react'

interface ClassSelectorProps {
  adventureClassData: any
  selectedClasses: string[]
  onToggleClass: (className: string) => void
}

export default function ClassSelector({ adventureClassData, selectedClasses, onToggleClass }: ClassSelectorProps) {
  const [expandedBranches, setExpandedBranches] = useState<string[]>([])

  const toggleBranch = (branch: string) => {
    setExpandedBranches((prev) => (prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]))
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-medium mb-2">Selected Classes ({selectedClasses.length})</h3>
        {selectedClasses.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedClasses.map((className) => (
              <div key={className} className="px-2 py-1 bg-muted rounded-md text-sm">
                {className}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No classes selected yet</p>
        )}
      </div>

      <Separator className="my-4" />

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {adventureClassData.Adventurer.paths.map((path: any, pathIndex: number) => (
            <Card key={`${path.branch}-${pathIndex}`}>
              <Collapsible
                open={expandedBranches.includes(`${path.branch}-${pathIndex}`)}
                onOpenChange={() => toggleBranch(`${path.branch}-${pathIndex}`)}
              >
                <CollapsibleTrigger className="w-full">
                  <CardContent className="p-3 flex items-center justify-between">
                    <h4 className="font-medium">
                      {path.branch} Path {pathIndex + 1}
                    </h4>
                    {expandedBranches.includes(`${path.branch}-${pathIndex}`) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-3 px-3">
                    <div className="space-y-3">
                      {path.path.map((classInfo: any) => {
                        const isSelected = selectedClasses.includes(classInfo.class)

                        return (
                          <div key={classInfo.class} className="flex items-start space-x-3">
                            <Checkbox
                              id={`class-${classInfo.class}`}
                              checked={isSelected}
                              onCheckedChange={() => onToggleClass(classInfo.class)}
                            />
                            <div className="grid gap-1.5">
                              <Label htmlFor={`class-${classInfo.class}`} className="font-medium cursor-pointer">
                                {classInfo.class}
                              </Label>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                {Object.entries(classInfo.stats).map(([key, value]) => {
                                  if (value === "0%" || value === "0") return null

                                  return (
                                    <div key={key} className="text-xs">
                                      <span className="font-medium">{key}:</span> {value}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}