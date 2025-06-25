import { useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import Sidebar from "../features/ChatBot/Sidebar";
import ChatArea from "../features/ChatBot/ChatArea";
import MessageInput from "../features/ChatBot/MessageInput";

function AiAssistant() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="relative flex flex-col h-screen sm:h-[calc(100vh-6.5rem)] transition-colors">
      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        {!isSidebarOpen && (
          <button
            className="absolute block top-5 sm:top-[50%] left-5 z-30 rounded-full shadow-md transition-all duration-300 ease-in-out"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <HiChevronRight className="text-gray-700" size={20} />
          </button>
        )}

        <main
          className={`flex flex-col flex-1 overflow-y-scroll ${
            isSidebarOpen ? "ml-80" : ""
          } relative`}
        >
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
              onClick={closeSidebar}
              aria-hidden="true"
            />
          )}

          <ChatArea />
          <MessageInput />
        </main>
      </div>
    </div>
  );
}

export default AiAssistant;