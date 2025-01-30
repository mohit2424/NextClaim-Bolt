"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddHearingRepDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddRep: (rep: Omit<HearingRep, "id">) => void
  type: "internal" | "external"
}

export function AddHearingRepDialog({ open, onOpenChange, onAddRep, type }: AddHearingRepDialogProps) {
  const [name, setName] = useState("")
  const [experience, setExperience] = useState("")
  const [hourlyRate, setHourlyRate] = useState("")
  const [winRate, setWinRate] = useState("")
  const [specialization, setSpecialization] = useState("")

  const handleAdd = () => {
    onAddRep({
      name,
      type,
      experience,
      hourlyRate,
      winRate,
      specialization,
    })
    onOpenChange(false)
    // Reset form
    setName("")
    setExperience("")
    setHourlyRate("")
    setWinRate("")
    setSpecialization("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {type === "internal" ? "Internal" : "External"} Representative</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="experience" className="text-right">
              Experience
            </Label>
            <Input
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="col-span-3"
              placeholder="e.g. 5 years"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hourlyRate" className="text-right">
              Hourly Rate
            </Label>
            <Input
              id="hourlyRate"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="col-span-3"
              placeholder="e.g. $150"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="winRate" className="text-right">
              Win Rate
            </Label>
            <Input
              id="winRate"
              value={winRate}
              onChange={(e) => setWinRate(e.target.value)}
              className="col-span-3"
              placeholder="e.g. 80%"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="specialization" className="text-right">
              Specialization
            </Label>
            <Input
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={handleAdd}>Add Representative</Button>
      </DialogContent>
    </Dialog>
  )
}

