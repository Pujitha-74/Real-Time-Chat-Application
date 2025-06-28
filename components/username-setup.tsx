"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

interface UsernameSetupProps {
  onUsernameSet: (username: string) => void
}

export function UsernameSetup({ onUsernameSet }: UsernameSetupProps) {
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onUsernameSet(username.trim())
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <MessageCircle className="h-12 w-12 text-blue-500" />
          </div>
          <CardTitle className="text-2xl">Join the Chat</CardTitle>
          <p className="text-gray-600">Enter your username to start chatting</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={20}
              required
            />
            <Button type="submit" className="w-full" disabled={!username.trim()}>
              Start Chatting
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
