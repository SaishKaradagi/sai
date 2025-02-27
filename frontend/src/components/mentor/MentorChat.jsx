import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Send } from "lucide-react";
import UserAvatar from "../shared/UserAvatar";

const MentorChat = () => {
  const { mentorId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get(`/api/mentors/${mentorId}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };
    fetchChat();
  }, [mentorId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(`/api/mentors/${mentorId}/messages`, {
        content: newMessage,
        sender: "user",
      });

      setMessages(response.data.messages);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/mentors")}>
            ← Back to Mentors
          </Button>
          <h2 className="text-xl font-bold">Mentor Chat</h2>
          <div></div>
        </div>

        <div className="h-[60vh] overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } gap-2`}
            >
              {message.sender !== "user" && <UserAvatar />}
              <div
                className={`max-w-md p-4 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 rounded-bl-none"
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-2 opacity-75">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </p>
              </div>
              {message.sender === "user" && <UserAvatar />}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button type="submit">
            <Send size={18} className="mr-2" />
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MentorChat;
