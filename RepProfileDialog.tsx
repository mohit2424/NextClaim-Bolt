import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface RepProfile {
  id: string
  name: string
  type: string
  winRate: string
  experience: string
  specialization: string
  hourlyRate?: string
  languages?: string[]
  education?: string
  caseHistory?: string
}

interface RepProfileDialogProps {
  rep: RepProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RepProfileDialog({ rep, open, onOpenChange }: RepProfileDialogProps) {
  if (!rep) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{rep.name} - Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-1">Type</h3>
              <p>{rep.type}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Experience</h3>
              <p>{rep.experience}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Specialization</h3>
            <p>{rep.specialization}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-1">Win Rate</h3>
              <p>{rep.winRate}</p>
            </div>
            {rep.hourlyRate && (
              <div>
                <h3 className="font-semibold mb-1">Hourly Rate</h3>
                <p>{rep.hourlyRate}</p>
              </div>
            )}
          </div>
          {rep.languages && (
            <div>
              <h3 className="font-semibold mb-1">Languages</h3>
              <p>{rep.languages.join(", ")}</p>
            </div>
          )}
          {rep.education && (
            <div>
              <h3 className="font-semibold mb-1">Education</h3>
              <p>{rep.education}</p>
            </div>
          )}
          {rep.caseHistory && (
            <div>
              <h3 className="font-semibold mb-1">Case History</h3>
              <p>{rep.caseHistory}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

