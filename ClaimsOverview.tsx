"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const recentClaims = [
  { id: "CLM001", name: "John Doe", email: "john@example.com", status: "pending" },
  { id: "CLM002", name: "Jane Smith", email: "jane@example.com", status: "in-progress" },
  { id: "CLM003", name: "Bob Johnson", email: "bob@example.com", status: "approved" },
  { id: "CLM004", name: "Alice Brown", email: "alice@example.com", status: "rejected" },
]

interface ClaimsOverviewProps {
  status?: string
}

export function ClaimsOverview({ status = "all" }: ClaimsOverviewProps) {
  const filteredClaims = status === "all" ? recentClaims : recentClaims.filter((claim) => claim.status === status)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Claims</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/claims${status !== "all" ? `?status=${status}` : ""}`}>View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {filteredClaims.map((claim) => (
            <div key={claim.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/avatars/${claim.id}.png`} alt="Avatar" />
                <AvatarFallback>{claim.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{claim.name}</p>
                <p className="text-sm text-muted-foreground">{claim.email}</p>
              </div>
              <div className="ml-auto font-medium">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/claims/${claim.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

