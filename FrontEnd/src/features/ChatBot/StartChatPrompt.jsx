import { useChat } from "../../context/ChatContext";

function StartChatPrompt() {
  const { createNewChat } = useChat();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Welcome to DietCraft Chat
        </h2>
        <p className="text-gray-600 mb-8 text-md md:text-lg">
          Your AI-powered assistant for coding, learning, and creative
          exploration
        </p>
        <button
          onClick={createNewChat}
          className="px-6 py-3 rounded-full bg-dietcraft-500 text-white hover:bg-dietcraft-600 border border-transparent transition-all transform hover:scale-105 font-medium"
        >
          Start a new chat
        </button>
      </div>
    </div>
  );
}

export default StartChatPrompt;