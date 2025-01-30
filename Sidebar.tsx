"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ClipboardList, Home, MessageSquare, Calendar, Clock, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const sidebarItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Claims Overview", icon: ClipboardList, href: "/claims" },
  { name: "Messages", icon: MessageSquare, href: "/messages" },
  { name: "Calendar", icon: Calendar, href: "/calendar" },
  { name: "Deadlines", icon: Clock, href: "/deadlines" },
  { name: "Employers", icon: Building2, href: "/employers" },
]

export function Sidebar() {
  const pathname = usePathname()

  // Hide sidebar on login page and contact page when accessed from login
  if (pathname === "/" || (pathname === "/contact" && document.referrer.includes("/"))) return null

  return (
    <TooltipProvider>
      <div className="fixed left-0 top-0 z-40 h-screen w-16 border-r bg-background pt-16">
        <div className="flex h-full flex-col items-center gap-4 py-4">
          {sidebarItems.map((item) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-10 w-10", pathname === item.href && "bg-muted hover:bg-muted")}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}

