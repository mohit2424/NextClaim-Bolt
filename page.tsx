"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { sendEmail } from "@/lib/email-service"

const messages = [
  {
    id: 1,
    sender: "John Smith",
    role: "Claims Analyst",
    message: "We need your W-2 form from your previous employer for claim processing.",
    timestamp: "2024-03-15 10:30 AM",
    claimId: "CLM001",
    email: "john.doe@example.com",
    status: "sent",
  },
  {
    id: 2,
    sender: "Emily Parker",
    role: "Employer Representative",
    message: "Could you please provide the exact date of separation?",
    timestamp: "2024-03-15 11:15 AM",
    claimId: "CLM002",
    email: "emily.wilson@walmart.com",
    status: "received",
  },
  {
    id: 3,
    sender: "Michael Wilson",
    role: "Claims Analyst",
    message: "Your claim has been updated. Please review the new determination.",
    timestamp: "2024-03-15 02:45 PM",
    claimId: "CLM003",
    email: "m.wilson@example.com",
    status: "sent",
  },
]

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClaim, setSelectedClaim] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const { toast } = useToast()

  const handleSendMessage = async () => {
    if (!newMessage || !selectedClaim || !recipientEmail) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      await sendEmail({
        to: recipientEmail,
        subject: `Claim ${selectedClaim} - New Message`,
        body: newMessage,
        claimId: selectedClaim,
        from: "claims.analyst@nextclaim.com",
      })

      toast({
        title: "Success",
        description: "Message sent successfully",
      })

      setNewMessage("")
      setSelectedClaim("")
      setRecipientEmail("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Messages
          </CardTitle>
          <div className="mt-2 flex gap-4">
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Input
              placeholder="Claim ID..."
              value={selectedClaim}
              onChange={(e) => setSelectedClaim(e.target.value)}
              className="max-w-[150px]"
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4 mb-6">
            <div className="space-y-4">
              {messages
                .filter(
                  (message) =>
                    message.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    message.claimId.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-4 rounded-lg border p-4 ${
                      message.status === "sent" ? "bg-muted/50" : "bg-background"
                    }`}
                  >
                    <Avatar>
                      <AvatarFallback>
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{message.sender}</p>
                          <p className="text-sm text-muted-foreground">
                            {message.role} • Claim {message.claimId}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <Mail className="h-4 w-4 inline-block mr-1" />
                            {message.email}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">{message.timestamp}</p>
                      </div>
                      <p className="mt-2">{message.message}</p>
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>
          <div className="space-y-4">
            <Input
              placeholder="Recipient Email..."
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              type="email"
            />
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button className="self-end" onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

