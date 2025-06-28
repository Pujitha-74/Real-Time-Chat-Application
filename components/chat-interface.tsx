"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSocket } from "@/hooks/useSocket"
import { MessageItem } from "./message-item"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Users, Wifi, WifiOff } from "lucide-react"

interface ChatInterfaceProps {
  username: string
}

export function ChatInterface({ username }: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  const { messages, users, isConnected, typingUsers, sendMessage, sendTyping } = useSocket(username)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage)
      setInputMessage("")
      handleStopTyping()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)

    if (!isTyping) {
      setIsTyping(true)
      sendTyping(true)
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping()
    }, 1000)
  }

  const handleStopTyping = () => {
    if (isTyping) {
      setIsTyping(false)
      sendTyping(false)
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      {/* Header */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Real-Time Chat
              {isConnected ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <Badge variant="secondary">{users.length + 1} online</Badge>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Welcome, <span className="font-semibold">{username}</span>!
          </div>
        </CardHeader>
      </Card>

      {/* Messages Area */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <div className="text-lg font-medium">No messages yet</div>
                <div className="text-sm">Start the conversation!</div>
              </div>
            ) : (
              messages.map((message) => (
                <MessageItem key={message.id} message={message} isOwnMessage={message.username === username} />
              ))
            )}

            {/* Typing Indicators */}
            {typingUsers.length > 0 && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="text-sm text-gray-600">
                    {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={!isConnected}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!isConnected || !inputMessage.trim()} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {!isConnected && <div className="text-sm text-red-500 mt-2">Disconnected. Trying to reconnect...</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
