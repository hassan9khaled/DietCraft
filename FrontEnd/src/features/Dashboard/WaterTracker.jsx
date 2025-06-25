import { useEffect, useState } from "react";
import { FaTint, FaPlus, FaMinus } from "react-icons/fa";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import ProgressBar from "../../ui/ProgressBar";

const WaterTracker = () => {
  function getInitialGlasses() {
    const today = new Date().toISOString().split("T")[0];
    const storedData = localStorage.getItem("waterGlasses");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.date === today) {
        return parsedData.glassesCount;
      }
    }

    localStorage.setItem(
      "waterGlasses",
      JSON.stringify({ date: today, glassesCount: 0 })
    );
    return 0;
  }

  const [glasses, setGlasses] = useState(getInitialGlasses);
  const targetGlasses = 8; // Default target: 8 glasses of water

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(
      "waterGlasses",
      JSON.stringify({ date: today, glassesCount: glasses })
    );
  }, [glasses]);

  const addWater = (amount = 1) => {
    setGlasses((prev) => Math.min(prev + amount, targetGlasses * 1.5)); // Allow up to 150% of target
  };

  const removeWater = (amount = 1) => {
    setGlasses((prev) => Math.max(prev - amount, 0));
  };

  const progress = Math.min((glasses / targetGlasses) * 100, 100);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center text-lg font-semibold text-gray-800">
          <FaTint size={20} className="mr-2 text-blue-400" /> Water Tracker
        </h2>
        <span className="text-sm text-gray-500">
          {glasses}/{targetGlasses} glasses
        </span>
      </div>

      <div className="mb-6">
        <ProgressBar
          progress={progress}
          height="h-3"
          color="bg-blue-400"
          background="bg-gray-200"
          showLabel={false}
          className="w-full rounded-full"
        />
      </div>

      <div className="flex items-center justify-center mb-4 space-x-4">
        {Array.from({ length: targetGlasses }, (_, i) => i + 1).map((index) => (
          <div
            key={index}
            className={`w-8 h-12 border-2 border-gray-800 ease-in-out rounded-b-lg flex items-end justify-center transition-all cursor-pointer hover:opacity-80 ${
              index <= glasses ? "bg-blue-400" : "bg-gray-200"
            }`}
            onClick={() => setGlasses(index)}
            title={`Set to ${index} glasses`}
          >
            <div className="w-full bg-white rounded-b-lg h-1/4 bg-opacity-20" />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Button
          variant="outlineForWater"
          size="sm"
          onClick={() => removeWater()}
          disabled={glasses === 0}
          className="mr-2"
          icon={<FaMinus size={16} />}
        >
          Remove
        </Button>
        <Button
          variant="water"
          size="sm"
          onClick={() => addWater()}
          disabled={glasses === targetGlasses}
          icon={<FaPlus size={16} />}
        >
          Add Water
        </Button>
      </div>

      <div className="mt-4 text-xs text-center text-gray-500">
        {glasses >= targetGlasses ? (
          <p className="text-blue-600">
            Great job! You&apos;ve reached your daily water goal.
          </p>
        ) : (
          <p>{`${targetGlasses - glasses} more glasses to reach your daily goal.`}</p>
        )}
      </div>
    </Card>
  );
};

export default WaterTracker;