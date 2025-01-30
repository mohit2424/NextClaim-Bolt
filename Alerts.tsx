import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const alerts = [
  { id: "CLM001", status: "Pending Review", message: "Claim CLM001 is awaiting document verification." },
  { id: "CLM002", status: "Action Required", message: "Additional information needed for claim CLM002." },
  { id: "CLM003", status: "Approved", message: "Claim CLM003 has been approved and is being processed." },
]

export function Alerts() {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Alert key={alert.id}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{alert.status}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

