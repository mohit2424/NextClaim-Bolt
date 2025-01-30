"use client"

import { useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const monthlyData = [
  { name: "Pending", value: 300 },
  { name: "In Progress", value: 150 },
  { name: "Approved", value: 650 },
  { name: "Rejected", value: 100 },
]

const COLORS = ["#22c55e", "#3b82f6", "#eab308", "#ef4444"]

interface InteractiveClaimsPieChartProps {
  onStatusSelect: (status: string) => void
}

export function InteractiveClaimsPieChart({ onStatusSelect }: InteractiveClaimsPieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [selectedYear, setSelectedYear] = useState("2024")

  const handleClick = (data: any, index: number) => {
    setActiveIndex(index)
    onStatusSelect(data.name.toLowerCase())
  }

  const blueGradients = ["#e6f3ff", "#cce7ff", "#99cfff", "#66b8ff", "#33a0ff", "#0088ff", "#0066cc", "#004d99"]

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
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
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={monthlyData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onClick={handleClick}
          >
            {monthlyData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={blueGradients[index % blueGradients.length]}
                opacity={index === activeIndex ? 1 : 0.7}
                className="transition-opacity duration-200"
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

