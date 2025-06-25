import { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useChat } from "../../context/ChatContext";

function MessageInput() {
  const [message, setMessage] = useState("");
  const { sendMessage, isTyping } = useChat();
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  useEffect(() => {
    if (textareaRef.current && !isTyping) {
      textareaRef.current.focus();
    }
  }, [isTyping]);

  useEffect(() => {
    if (textareaRef.current && isTyping) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      sendMessage(message);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="sticky left-0 right-0 px-4 bottom-0 bg-white pb-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2 p-2 bg-white border-2 border-gray-200 shadow-sm backdrop-blur-lg rounded-2xl">
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message DietCraft..."
              className="w-full px-4 py-2 text-gray-900 bg-transparent resize-none rounded-xl placeholder:text-gray-500 focus:outline-none"
              rows={1}
              disabled={isTyping}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim() || isTyping}
            className={`
              p-2 rounded-full transition-all
              ${
                message.trim() && !isTyping
                  ? "bg-dietcraft-500 text-white hover:bg-dietcraft-600 border border-transparent"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }
            `}
            aria-label="Send message"
          >
            <FiSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
