import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const recentClaims = [
  {
    id: "CLM001",
    name: "John Doe",
    email: "john@example.com",
    status: "In Progress",
  },
  {
    id: "CLM002",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Approved",
  },
  {
    id: "CLM003",
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "Pending",
  },
  {
    id: "CLM004",
    name: "Alice Brown",
    email: "alice@example.com",
    status: "Rejected",
  },
]

export function RecentClaims() {
  return (
    <div className="space-y-8">
      {recentClaims.map((claim) => (
        <div key={claim.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{claim.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{claim.name}</p>
            <p className="text-sm text-muted-foreground">{claim.email}</p>
          </div>
          <div className="ml-auto font-medium">
            <Button variant="outline" size="sm">
              View
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

