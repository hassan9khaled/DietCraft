/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { formatDate, copyToClipboard } from "../../utils/helpers";

function Message({ message }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      style={{ animationDelay: "0.1s" }}
    >
      <div
        className={`
          relative max-w-[85%] md:max-w-[75%] rounded-lg p-3
          ${isUser ? "bg-dietcraft-500 text-white border border-transparent" : "bg-[#e9ecef] text-gray-900"}
        `}
      >
        <p
          className={`${isUser ? "font-medium" : ""} break-words whitespace-pre-wrap`}
        >
          {message.content}
        </p>

        <div className="flex items-center justify-between mt-2 text-xs">
          <span className={`${isUser ? "text-white" : "text-gray-500"}`}>
            {formatDate(message.timestamp)}
          </span>

          {!isUser && (
            <button
              onClick={handleCopy}
              className="ml-2 p-1 rounded hover:bg-gray-300 transition-colors"
              aria-label={copied ? "Copied" : "Copy to clipboard"}
            >
              {copied ? (
                <FiCheck size={14} className="text-green-500" />
              ) : (
                <FiCopy size={14} className="text-gray-600" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;