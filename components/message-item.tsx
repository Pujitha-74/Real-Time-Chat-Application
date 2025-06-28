import type { Message } from "@/hooks/useSocket"
import { formatDistanceToNow } from "date-fns"

interface MessageItemProps {
  message: Message
  isOwnMessage: boolean
}

export function MessageItem({ message, isOwnMessage }: MessageItemProps) {
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {!isOwnMessage && <div className="text-xs font-semibold mb-1 opacity-75">{message.username}</div>}
        <div className="text-sm">{message.text}</div>
        <div className={`text-xs mt-1 ${isOwnMessage ? "text-blue-100" : "text-gray-500"}`}>
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </div>
      </div>
    </div>
  )
}
