import React from "react";
import { FileText } from "lucide-react";

const MessageBubble = ({ message, currentUser }) => {
  const isMine = message.sender.userId === currentUser.userId;
  const isSystem = message.sender.userId === "system";

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md italic">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
      {!isMine && (
        <div className="w-8 h-8 rounded-full bg-purple-400 text-white flex items-center justify-center">
          {message.sender.displayName.charAt(0)}
        </div>
      )}

      <div
        className={`rounded-lg px-4 py-2 max-w-[70%] ${
          isMine ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {!isMine && (
          <p className="text-xs font-medium mb-1">
            {message.sender.displayName}
          </p>
        )}
        {message.messageType === "file" ? (
          <>
            <div className="flex items-center gap-2">
              <FileText size={18} />
              <span className="font-medium">{message.fileName}</span>
            </div>
            <a
              href={message.fileUrl}
              className="text-blue-600 text-xs underline"
            >
              Download PDF
            </a>
          </>
        ) : (
          <p>{message.content}</p>
        )}
        <div className="text-xs mt-1 text-right">
          {formatTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
