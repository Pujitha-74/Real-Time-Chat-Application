"use client"

import { useState, useEffect } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { UsernameSetup } from "@/components/username-setup"

export default function ChatApp() {
  const [username, setUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if username is stored in localStorage
    const storedUsername = localStorage.getItem("chat-username")
    if (storedUsername) {
      setUsername(storedUsername)
    }
    setIsLoading(false)
  }, [])

  const handleUsernameSet = (newUsername: string) => {
    setUsername(newUsername)
    localStorage.setItem("chat-username", newUsername)
  }

  const handleUsernameReset = () => {
    setUsername(null)
    localStorage.removeItem("chat-username")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!username) {
    return <UsernameSetup onUsernameSet={handleUsernameSet} />
  }

  return <ChatInterface username={username} />
}
