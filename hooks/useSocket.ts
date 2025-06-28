"use client"

import { useEffect, useRef, useState } from "react"
import { io, type Socket } from "socket.io-client"

export interface Message {
  id: string
  text: string
  username: string
  userId: string
  timestamp: string
}

export interface User {
  id: string
  username: string
}

export function useSocket(username: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io({
      path: "/api/socket",
    })

    const socket = socketRef.current

    socket.on("connect", () => {
      setIsConnected(true)
      socket.emit("join", { username })
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
    })

    socket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message])
    })

    socket.on("user-joined", (user: { id: string; username: string }) => {
      setUsers((prev) => [...prev, user])
    })

    socket.on("user-left", (data: { username: string }) => {
      setUsers((prev) => prev.filter((user) => user.username !== data.username))
    })

    socket.on("user-typing", (data: { username: string; isTyping: boolean }) => {
      setTypingUsers((prev) => {
        if (data.isTyping) {
          return prev.includes(data.username) ? prev : [...prev, data.username]
        } else {
          return prev.filter((user) => user !== data.username)
        }
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [username])

  const sendMessage = (text: string) => {
    if (socketRef.current && text.trim()) {
      socketRef.current.emit("message", { text: text.trim() })
    }
  }

  const sendTyping = (isTyping: boolean) => {
    if (socketRef.current) {
      socketRef.current.emit("typing", { isTyping })
    }
  }

  return {
    messages,
    users,
    isConnected,
    typingUsers,
    sendMessage,
    sendTyping,
  }
}
