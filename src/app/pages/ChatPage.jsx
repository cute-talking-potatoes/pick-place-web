import { useState } from "react";
import { useParams, Link } from "react-router";
import { TopNav } from "../components/TopNav";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Send, ArrowLeft } from "lucide-react";
import { PP_COLORS } from "../utils/ppStyles";
import { mockChatRooms, mockMessages } from "../data/mockData";
function ChatPage() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  if (id) {
    const room = mockChatRooms.find((r) => r.id === id);
    return <div className="h-screen flex flex-col bg-gray-50">
        {
      /* Header */
    }
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <Link to="/chat">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h2 className="font-semibold">{room?.name}</h2>
            <p className="text-xs text-gray-500">3명 참여 중</p>
          </div>
        </div>

        {
      /* Messages */
    }
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((msg) => {
      const isMe = msg.senderId === "me";
      return <div
        key={msg.id}
        className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}
      >
                {!isMe && <Avatar className="w-8 h-8">
                    <AvatarFallback>{msg.senderName[0]}</AvatarFallback>
                  </Avatar>}
                <div className={`flex flex-col ${isMe ? "items-end" : ""}`}>
                  {!isMe && <span className="text-xs text-gray-600 mb-1">
                      {msg.senderName}
                    </span>}
                  <div
        className={`rounded-2xl px-4 py-3 ${isMe ? "text-white" : "bg-white text-gray-900"}`}
        style={isMe ? { backgroundColor: PP_COLORS.sage } : {}}
      >
                    <p>{msg.message}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>;
    })}
        </div>

        {
      /* Input */
    }
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <Input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="💬 메시지를 입력하세요..."
      className="flex-1"
      onKeyPress={(e) => {
        if (e.key === "Enter" && message.trim()) {
          setMessage("");
        }
      }}
    />
            <Button
      size="icon"
      style={{ backgroundColor: PP_COLORS.sage, color: "white" }}
      onClick={() => setMessage("")}
    >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
      <TopNav title="💬 채팅" />

      <div className="pt-14">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="space-y-2">
            {mockChatRooms.map((room) => <Link key={room.id} to={`/chat/${room.id}`}>
                <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-4">
                  <Avatar className="w-14 h-14" style={{ backgroundColor: `${PP_COLORS.lime}40` }}>
                    <AvatarFallback style={{ color: PP_COLORS.olive }}>
                      {room.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {room.name}
                      </h3>
                      {room.unreadCount > 0 && <Badge style={{ backgroundColor: PP_COLORS.sage }}>{room.unreadCount}</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {room.lastMessage}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {room.timestamp}
                  </div>
                </div>
              </Link>)}
          </div>

          {mockChatRooms.length === 0 && <div className="text-center py-20">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="font-semibold text-xl mb-2">아직 채팅방이 없어요</h3>
              <p className="text-gray-600">모임에 참여하면 채팅�� 시작할 수 있어요!</p>
            </div>}
        </div>
      </div>

      <BottomNav />
    </div>;
}
export {
  ChatPage
};
