export interface Setup {
  id: number
  name: string
  runes: any[]
  classes: string[]
  totalStats: Record<string, any>
}

// Helper function to parse percentage values
export function parsePercentage(value: string): number {
  if (!value || value === "none" || value === "0%") return 0

  // Handle values like "0,50" (comma as decimal separator)
  if (value.includes(",")) {
    return Number.parseFloat(value.replace(",", "."))
  }

  // Handle percentage values like "10%"
  if (value.endsWith("%")) {
    return Number.parseFloat(value.slice(0, -1))
  }

  return Number.parseFloat(value) || 0
}

// Format a value as a percentage or number
export function formatValue(value: number): string {
  if (value === 0) return "0%"

  // Check if it's a whole number
  if (Number.isInteger(value)) {
    return `${value}%`
  }

  // Format with 2 decimal places
  return `${value.toFixed(2)}%`
}

// Find a class in the adventure class data
function findClassInData(className: string, adventureClassData: any): any {
  for (const path of adventureClassData.Adventurer.paths) {
    for (const classInfo of path.path) {
      if (classInfo.class === className) {
        return classInfo
      }
    }
  }
  return null
}

// Update the calculateTotalStats function to handle multiple instances of the same rune
// and to include class stats
export function calculateTotalStats(
  runes: any[],
  classes: string[],
  runeAuraData: any[],
  adventureClassData?: any,
): Record<string, any> {
  const stats: Record<string, number> = {
    Health: 0,
    "P. Atk": 0,
    "P. Def": 0,
    "M. Atk": 0,
    "M. Def": 0,
    "Ele. Atk": 0,
    "Ele. Def": 0,
    "Spirit Atk": 0,
    "Spirit ATK": 0, // Handle both variants of the name
    "Increase STR": 0,
    "Increase AGI": 0,
    "Increase INT": 0,
    "Cr. Rate": 0,
    "Cr. Dmg": 0,
    "Skill CD": 0,
    "Atk Delay": 0,
    "HP Recovery per Kill": 0,
    "HP Recovery": 0,
    "HP recovery": 0, // Handle both variants of the name
    "HP Recovery per attack": 0,
    Movementspeed: 0,
    "Double Critical": 0,
  }

  // Add stats from runes
  runes.forEach((rune) => {
    Object.entries(rune).forEach(([key, value]) => {
      // Skip non-stat fields
      if (["Rune Name", "Rune 1 ", "Rune 2", "Rune 3", "Rune 4"].includes(key)) return

      // Handle aura separately
      if (key === "Aura") {
        if (value !== "none") {
          const auraChance = parsePercentage(rune["Aura Chance"])
          if (auraChance > 0) {
            // Find the aura in the aura data
            const aura = runeAuraData.find((a) => a.Aura === value)
            if (aura) {
              // Apply aura stats with the chance percentage
              Object.entries(aura).forEach(([auraKey, auraValue]) => {
                if (auraKey !== "Aura" && stats[auraKey] !== undefined) {
                  const parsedValue = parsePercentage(auraValue as string)
                  // Apply the aura effect based on its chance
                  stats[auraKey] += (parsedValue * auraChance) / 100
                }
              })
            }
          }
        }
        return
      }

      // Skip aura chance field
      if (key === "Aura Chance") return

      // Add the stat if it exists in our stats object
      if (stats[key] !== undefined) {
        stats[key] += parsePercentage(value as string)
      }

      // Handle variant names (e.g., "Spirit ATK" vs "Spirit Atk")
      if (key === "Spirit ATK" && stats["Spirit Atk"] !== undefined) {
        stats["Spirit Atk"] += parsePercentage(value as string)
      }
      if (key === "HP recovery" && stats["HP Recovery"] !== undefined) {
        stats["HP Recovery"] += parsePercentage(value as string)
      }
    })
  })

  // Add stats from classes
  if (adventureClassData && classes.length > 0) {
    classes.forEach((className) => {
      const classInfo = findClassInData(className, adventureClassData)
      if (classInfo && classInfo.stats) {
        Object.entries(classInfo.stats).forEach(([key, value]) => {
          if (stats[key] !== undefined) {
            stats[key] += parsePercentage(value as string)
          }
        })
      }
    })
  }

  // Format the stats for display
  const formattedStats: Record<string, string> = {}
  Object.entries(stats).forEach(([key, value]) => {
    if (value !== 0) {
      // Only include non-zero stats
      formattedStats[key] = formatValue(value)
    }
  })

  return formattedStats
}

