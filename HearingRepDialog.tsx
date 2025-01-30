"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { AddHearingRepDialog } from "./AddHearingRepDialog"
import { DeleteHearingRepDialog } from "./DeleteHearingRepDialog"

interface HearingRep {
  id: string
  name: string
  type: "internal" | "external"
  experience: string
  hourlyRate: string
  winRate: string
  specialization: string
}

interface HearingRepDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  internalReps: HearingRep[]
  externalReps: HearingRep[]
  onAddRep: (rep: Omit<HearingRep, "id">) => void
  onRemoveRep: (id: string) => void
  selectedReps: string[]
  onSelectRep: (id: string) => void
  onViewProfile: (rep: HearingRep) => void
}

export function HearingRepDialog({
  open,
  onOpenChange,
  internalReps,
  externalReps,
  onAddRep,
  onRemoveRep,
  selectedReps,
  onSelectRep,
  onViewProfile,
}: HearingRepDialogProps) {
  const [currentTab, setCurrentTab] = useState<"internal" | "external">("internal")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const currentReps = currentTab === "internal" ? internalReps : externalReps

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Hearing Representatives</DialogTitle>
        </DialogHeader>
        <div className="my-4">
          <Tabs defaultValue="internal" onValueChange={(value) => setCurrentTab(value as "internal" | "external")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="internal">Internal Reps</TabsTrigger>
              <TabsTrigger value="external">External Reps</TabsTrigger>
            </TabsList>
            <TabsContent value="internal">
              <ScrollArea className="h-[400px] rounded-md border p-4">
                {internalReps.map((rep) => (
                  <div key={rep.id} className="flex items-center space-x-4 mb-4 p-4 border rounded-lg">
                    <Checkbox
                      id={rep.id}
                      checked={selectedReps.includes(rep.id)}
                      onCheckedChange={() => onSelectRep(rep.id)}
                      disabled={selectedReps.length >= 2 && !selectedReps.includes(rep.id)}
                    />
                    <div className="flex-grow">
                      <label htmlFor={rep.id} className="text-base font-medium">
                        {rep.name}
                      </label>
                      <div className="text-sm text-muted-foreground">Internal • {rep.experience}</div>
                      <div className="text-sm">
                        Hourly Rate: {rep.hourlyRate} • Win Rate: {rep.winRate}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => onViewProfile(rep)}>
                      View Profile
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="external">
              <ScrollArea className="h-[400px] rounded-md border p-4">
                {externalReps.map((rep) => (
                  <div key={rep.id} className="flex items-center space-x-4 mb-4 p-4 border rounded-lg">
                    <Checkbox
                      id={rep.id}
                      checked={selectedReps.includes(rep.id)}
                      onCheckedChange={() => onSelectRep(rep.id)}
                      disabled={selectedReps.length >= 2 && !selectedReps.includes(rep.id)}
                    />
                    <div className="flex-grow">
                      <label htmlFor={rep.id} className="text-base font-medium">
                        {rep.name}
                      </label>
                      <div className="text-sm text-muted-foreground">External • {rep.experience}</div>
                      <div className="text-sm">
                        Hourly Rate: {rep.hourlyRate} • Win Rate: {rep.winRate}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => onViewProfile(rep)}>
                      View Profile
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <Button onClick={() => setShowAddDialog(true)}>
              Add {currentTab === "internal" ? "Internal" : "External"} Rep
            </Button>
            <Button onClick={() => setShowDeleteDialog(true)}>
              Delete {currentTab === "internal" ? "Internal" : "External"} Rep
            </Button>
          </div>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Confirm Selection
          </Button>
        </div>
      </DialogContent>

      <AddHearingRepDialog open={showAddDialog} onOpenChange={setShowAddDialog} onAddRep={onAddRep} type={currentTab} />

      <DeleteHearingRepDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onRemoveRep={onRemoveRep}
        hearingReps={currentReps}
      />
    </Dialog>
  )
}

