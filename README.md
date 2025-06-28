# Real-Time Chat Application

A modern, responsive real-time chat application built with React.js and Next.js, featuring instant messaging, user presence tracking, and message history.

## Features

### Core Functionality

- **Real-time messaging** - Instant message delivery and receipt
- **User authentication** - Simple username-based login system
- **Message history** - Persistent storage of chat messages (last 100 messages)
- **User presence** - See who's online in real-time
- **Connection status** - Visual indicators for connection state


### User Interface

- **Responsive design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI** - Clean, professional interface with smooth animations
- **Dark theme** - Eye-friendly dark color scheme
- **Avatar system** - Color-coded user avatars for easy identification
- **Mobile-first** - Optimized for mobile devices with collapsible sidebar


### Technical Features

- **Auto-scroll** - Automatically scrolls to latest messages
- **Message timestamps** - Shows when each message was sent
- **Join/leave notifications** - System messages for user activity
- **Error handling** - Graceful handling of connection issues
- **Performance optimized** - Efficient polling and state management


## ️ Tech Stack

- **Frontend**: React.js, Next.js 14 (App Router)
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Real-time Updates**: Polling-based simulation (upgradeable to WebSockets)
- **TypeScript**: Full type safety
- **Icons**: Lucide React


## Project Structure

```plaintext
├── app/
│   ├── api/chat/route.ts          # Chat API endpoints
│   └── page.tsx                   # Main application entry
├── components/
│   ├── chat-interface.tsx         # Main chat interface
│   ├── login-form.tsx            # User authentication
│   └── ui/                       # Reusable UI components
├── hooks/
│   └── use-chat.ts               # Custom chat hook
├── lib/
│   └── websocket-server.ts       # Server utilities
└── types/
    └── chat.ts                   # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn


### Installation

1. **Clone the repository**

```shellscript
git clone https://github.com/yourusername/chat-application.git
cd chat-application
```


2. **Install dependencies**

```shellscript
npm install
# or
yarn install
```


3. **Run the development server**

```shellscript
npm run dev
# or
yarn dev
```


4. **Open your browser**
Navigate to `http://localhost:3000`


## Usage

### Basic Usage

1. **Enter Username**: Choose a unique username on the login screen
2. **Start Chatting**: Type messages in the input field and press Enter
3. **View Users**: See online users in the sidebar (desktop) or user count (mobile)
4. **Real-time Updates**: Messages appear instantly for all connected users


### Features Guide

- **Send Messages**: Type in the input field and press Enter or click Send
- **View History**: Scroll up to see previous messages
- **User Status**: Green indicators show online users
- **Connection Status**: Top-right indicator shows connection state
- **Mobile Navigation**: Tap user count to see online users on mobile


## Configuration

### Environment Variables

Currently, the application runs without external dependencies. For production deployment, consider adding:

```plaintext
# Optional: Database connection
DATABASE_URL=your_database_url

# Optional: Redis for session management
REDIS_URL=your_redis_url
```

### Customization

- **Message Limit**: Change message history limit in `lib/websocket-server.ts`
- **Polling Interval**: Adjust real-time update frequency in `hooks/use-chat.ts`
- **Styling**: Modify colors and themes in Tailwind configuration


## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings


### Other Platforms

The application can be deployed on any platform supporting Next.js:

- Netlify
- Railway
- Heroku
- AWS Amplify


## Future Enhancements

### Planned Features

- **WebSocket Integration** - True real-time communication
- **File Sharing** - Image and document uploads
- **Message Reactions** - Emoji reactions to messages
- **Typing Indicators** - Show when users are typing
- **Chat Rooms** - Multiple chat channels
- **Message Search** - Search through chat history
- **User Profiles** - Extended user information
- **Message Encryption** - End-to-end encryption
- **Push Notifications** - Browser notifications for new messages


### Technical Improvements

- **Database Integration** - Persistent message storage
- **Authentication** - OAuth and secure login
- **Rate Limiting** - Prevent spam and abuse
- **Message Moderation** - Content filtering
- **Offline Support** - PWA capabilities


## Contributing

1. **Fork the repository**
2. **Create a feature branch**

```shellscript
git checkout -b feature/amazing-feature
```


3. **Commit your changes**

```shellscript
git commit -m 'Add amazing feature'
```


4. **Push to the branch**

```shellscript
git push origin feature/amazing-feature
```

