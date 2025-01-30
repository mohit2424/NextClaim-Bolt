"use client"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const monthlyData = [
  { name: "Jan", total: 300 },
  { name: "Feb", total: 150 },
  { name: "Mar", total: 650 },
  { name: "Apr", total: 100 },
  { name: "May", total: 400 },
  { name: "Jun", total: 200 },
  { name: "Jul", total: 550 },
  { name: "Aug", total: 300 },
  { name: "Sep", total: 450 },
  { name: "Oct", total: 250 },
  { name: "Nov", total: 600 },
  { name: "Dec", total: 350 },
]

const weeklyData = {
  Jan: [
    { name: "Week 1", total: 75 },
    { name: "Week 2", total: 90 },
    { name: "Week 3", total: 65 },
    { name: "Week 4", total: 70 },
  ],
  Feb: [
    { name: "Week 1", total: 40 },
    { name: "Week 2", total: 35 },
    { name: "Week 3", total: 45 },
    { name: "Week 4", total: 30 },
  ],
  // ... add data for other months
}

interface InteractiveClaimsBarChartProps {
  onStatusSelect: (status: string) => void
}

export function InteractiveClaimsBarChart({ onStatusSelect }: InteractiveClaimsBarChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isMonthly, setIsMonthly] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState("Jan")
  const [selectedYear, setSelectedYear] = useState("2024")

  const handleClick = (data: any, index: number) => {
    setActiveIndex(index)
    onStatusSelect(data.name.toLowerCase())
  }

  const currentData = isMonthly ? monthlyData : weeklyData[selectedMonth]

  const blueGradients = ["#e6f3ff", "#cce7ff", "#99cfff", "#66b8ff", "#33a0ff", "#0088ff", "#0066cc", "#004d99"]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch id="chart-toggle" checked={isMonthly} onCheckedChange={setIsMonthly} />
          <Label htmlFor="chart-toggle">{isMonthly ? "Monthly" : "Weekly"}</Label>
        </div>
        {isMonthly ? (
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(weeklyData).map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={currentData}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Bar dataKey="total" radius={[4, 4, 0, 0]} onClick={handleClick}>
            {currentData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={blueGradients[index % blueGradients.length]}
                className="transition-colors duration-200"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

