/* eslint-disable react/prop-types */
import { FaRegClock } from "react-icons/fa";
function RecentLog({ meal }) {
  function getHourMinute(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const isPM = hours >= 12;
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; // 0 becomes 12
    return `${hours}:${minutes} ${isPM ? "PM" : "AM"}`;
  }
  return (
    <div className="p-4 rounded-lg shadow-sm border border-gray-200 bg-[#F9FAFB]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-gray-400">
            <FaRegClock size={22} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              {meal.mealName.charAt(0) + meal.mealName.slice(1).toLowerCase()}
            </h3>
            <p className="text-gray-600">{meal.mealType}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-500">{getHourMinute(meal.created_at)}</p>
          <p className="font-semibold">{Math.ceil(meal.calories)} kcal</p>
        </div>
      </div>
    </div>
  );
}

export default RecentLog;
