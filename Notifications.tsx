"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const notifications = [
  {
    id: 1,
    type: "appeal",
    message: "Employer Appealed for Claim ID: 12345",
    date: "2024-03-21",
  },
  {
    id: 2,
    type: "overdue",
    message: "Claim ID: 67890 is Overdue",
    date: "2024-03-20",
  },
  {
    id: 3,
    type: "hearing",
    message: "Hearing Scheduled for Claim ID: 11223",
    date: "2024-03-22",
  },
]

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Notifications</p>
            <p className="text-xs text-muted-foreground">You have {notifications.length} unread messages</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="cursor-pointer">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    notification.type === "appeal"
                      ? "bg-yellow-500"
                      : notification.type === "overdue"
                        ? "bg-red-500"
                        : "bg-blue-500"
                  }`}
                />
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <p className="text-xs text-muted-foreground pl-4">{notification.date}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

