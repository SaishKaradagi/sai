import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Send, FileText, PaperclipIcon } from "lucide-react";

const MessageBubble = ({ message, currentUser }) => {
  const isMine = message.sender.userId === currentUser.userId;
  const isSystem = message.sender.userId === "system";

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Different styling for system messages
  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-gray-100 text-gray-800 rounded-md px-4 py-2 max-w-[80%] text-sm italic">
          {message.content}
        </div>
      </div>
    );
  }

  // File message styling
  if (message.messageType === "file") {
    return (
      <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
        <div
          className={`rounded-lg px-4 py-2 max-w-[70%] ${
            isMine
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-gray-800 rounded-bl-none"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <FileText size={18} />
            <span className="font-medium">
              {message.fileName || "Document"}
            </span>
          </div>
          <p className="text-sm">{message.content}</p>
          <a
            href={`http://localhost:3000${message.fileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs underline ${
              isMine ? "text-blue-100" : "text-blue-600"
            }`}
          >
            Download PDF
          </a>
          <div className="text-xs mt-1 text-right">
            {formatTime(message.createdAt)}
          </div>
        </div>
      </div>
    );
  }

  // Regular message styling
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
      {!isMine && (
        <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center text-white font-medium mr-2 flex-shrink-0">
          {message.sender.displayName.charAt(0).toUpperCase()}
        </div>
      )}
      <div
        className={`rounded-lg px-4 py-2 max-w-[70%] ${
          isMine
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {!isMine && (
          <p className="text-xs font-medium mb-1">
            {message.sender.displayName}
          </p>
        )}
        <p>{message.content}</p>
        <div className="text-xs mt-1 text-right">
          {formatTime(message.createdAt)}
        </div>
      </div>
      {isMine && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium ml-2 flex-shrink-0">
          {message.sender.displayName.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

const CommunityChat = ({ communityId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Mock user for development - replace with actual auth
  const currentUser = {
    userId: localStorage.getItem("userId") || "user123",
    email: localStorage.getItem("email") || "user@example.com",
    displayName: localStorage.getItem("displayName") || "Current User",
  };

  // Socket.io connection setup
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    // Join community room
    newSocket.emit("join-community", communityId);

    // Listen for new messages
    newSocket.on("new-message", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Listen for new file uploads
    newSocket.on("new-file", (fileData) => {
      setMessages((prevMessages) => [...prevMessages, fileData]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [communityId]);

  // Fetch previous messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/communities/${communityId}/messages`
        );
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [communityId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      const messageData = {
        communityId,
        userId: currentUser.userId,
        email: currentUser.email,
        displayName: currentUser.displayName,
        content: newMessage,
      };

      socket.emit("send-message", messageData);
      setNewMessage("");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        alert("Only PDF files are allowed");
        e.target.value = null;
      }
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setUploadLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", currentUser.userId);
    formData.append("email", currentUser.email);
    formData.append("displayName", currentUser.displayName);
    formData.append("message", `Shared a file: ${file.name}`);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/communities/${communityId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Notify others about new file
      if (socket) {
        socket.emit("file-uploaded", response.data);
      }

      // Reset file input
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    } finally {
      setUploadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">
              No messages yet. Be the first to say hello!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message._id}
              message={message}
              currentUser={currentUser}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* File upload section */}
      {file && (
        <div className="p-2 bg-gray-100 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-blue-500" />
              <span className="text-sm truncate max-w-[200px]">
                {file.name}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
                className="text-red-500 h-8"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleFileUpload}
                disabled={uploadLoading}
                className="h-8"
              >
                {uploadLoading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Message input */}
      <div className="p-3 border-t bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-blue-500"
            onClick={() => fileInputRef.current?.click()}
          >
            <PaperclipIcon size={20} />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="application/pdf"
            />
          </Button>

          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />

          <Button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CommunityChat;
