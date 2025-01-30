"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DeleteHearingRepDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRemoveRep: (id: string) => void
  hearingReps: Array<{
    id: string
    name: string
    type: string
  }>
}

export function DeleteHearingRepDialog({ open, onOpenChange, onRemoveRep, hearingReps }: DeleteHearingRepDialogProps) {
  const [selectedRep, setSelectedRep] = useState<string>("")

  const handleDelete = () => {
    if (selectedRep) {
      onRemoveRep(selectedRep)
      onOpenChange(false)
      setSelectedRep("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Hearing Representative</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select value={selectedRep} onValueChange={setSelectedRep}>
            <SelectTrigger>
              <SelectValue placeholder="Select a representative to delete" />
            </SelectTrigger>
            <SelectContent>
              {hearingReps.map((rep) => (
                <SelectItem key={rep.id} value={rep.id}>
                  {rep.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleDelete} disabled={!selectedRep}>
          Delete Representative
        </Button>
      </DialogContent>
    </Dialog>
  )
}

