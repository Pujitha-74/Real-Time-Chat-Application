import type { NextRequest } from "next/server"
import { Server } from "socket.io"

let io: Server | undefined

export async function GET(req: NextRequest) {
  if (!io) {
    // Initialize Socket.IO server
    const httpServer = (global as any).httpServer
    io = new Server(httpServer, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    })

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id)

      // Handle user joining
      socket.on("join", (userData) => {
        socket.data.user = userData
        socket.broadcast.emit("user-joined", {
          id: socket.id,
          username: userData.username,
          timestamp: new Date().toISOString(),
        })
      })

      // Handle new messages
      socket.on("message", (messageData) => {
        const message = {
          id: Date.now().toString(),
          text: messageData.text,
          username: socket.data.user?.username || "Anonymous",
          userId: socket.id,
          timestamp: new Date().toISOString(),
        }

        // Broadcast message to all clients including sender
        io?.emit("message", message)
      })

      // Handle typing indicators
      socket.on("typing", (data) => {
        socket.broadcast.emit("user-typing", {
          username: socket.data.user?.username,
          isTyping: data.isTyping,
        })
      })

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id)
        socket.broadcast.emit("user-left", {
          username: socket.data.user?.username,
          timestamp: new Date().toISOString(),
        })
      })
    })
  }

  return new Response("Socket.IO server initialized", { status: 200 })
}
