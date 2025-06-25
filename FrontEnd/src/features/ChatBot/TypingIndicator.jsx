function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fadeIn mb-4">
      <div className="bg-[#e9ecef] rounded-lg p-3 max-w-[300px]">
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Ollama is typing....</span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;