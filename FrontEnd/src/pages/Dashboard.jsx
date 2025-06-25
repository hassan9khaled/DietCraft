import { FaUtensils, FaCalculator } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsChatRightDotsFill } from "react-icons/bs";
import useUser from "../features/auth/useUser";
import Card from "../ui/Card";
import useGetTarget from "../features/DietRecommendation/useGetTarget";
import Spinner from "../ui/Spinner";
import useGetFood from "../features/foodLog/useGetFood";
import RecentLog from "../features/Dashboard/RecentLog";
import WaterTracker from "../features/Dashboard/WaterTracker";
import useGetProgress from "../features/foodLog/useGetProgress";
import {
  getRecentMeals,
  summarizeTodaysMeals,
} from "../features/Dashboard/RecentCalc";

function Dashboard() {
  const { user, isAuthenticated } = useUser();
  const { getTarget, isPending } = useGetTarget(user?.email);
  const { foodData, isPending: isFoodPending } = useGetFood(user?.email);
  const { progressData, isPending: isProgressPending } = useGetProgress(
    user?.email
  );
  const meals = [
    ...(Array.isArray(foodData) ? foodData : []),
    ...(Array.isArray(progressData) ? progressData : []),
  ];

  const { totals, todaysMeals } = summarizeTodaysMeals(meals);
  const recentMeals = getRecentMeals(todaysMeals, 3);

  const Name =
    user?.user_metadata?.firstName + " " + user?.user_metadata?.lastName;

  const dailyTips = [
    "Drink a glass of water before every meal to help control portion sizes.",
    "Aim for at least 30 minutes of physical activity every day.",
    "Include a variety of colorful fruits and vegetables in your meals.",
    "Track your progress regularly to stay motivated.",
    "Start your day with a high-protein breakfast to stay full longer.",
    "Get at least 7-9 hours of sleep each night for better overall health.",
    "Limit processed foods and opt for whole, natural ingredients instead.",
    "Practice mindful eating—slow down and savor each bite.",
    "Take short breaks from sitting every hour to stretch and move.",
    "Drink herbal tea instead of sugary beverages to stay hydrated.",
    "Plan your meals ahead to make healthier choices throughout the week.",
    "Reduce screen time before bed to improve sleep quality.",
    "Engage in deep breathing exercises to reduce stress and anxiety.",
    "Swap refined grains for whole grains like brown rice and quinoa.",
    "Use smaller plates to help control portion sizes naturally.",
    "Choose lean protein sources like fish, chicken, and plant-based proteins.",
    "Snack on nuts and seeds for a boost of healthy fats and energy.",
    "Get fresh air and natural sunlight daily to improve mood and vitamin D levels.",
    "Prioritize mental health by practicing gratitude and positive thinking.",
  ];
  const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];

  // Loading State
  if (isPending || isFoodPending || isProgressPending) return <Spinner />;

  return (
    <main className="p-5">
      {/* Welcome Section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="mb-3 text-xl font-bold text-gray-800 sm:text-3xl">
          Welcome back, {isAuthenticated ? Name : "User"}!
        </h1>
        <p className="text-sm text-gray-600 md:text-base">
          Keep up the great work on your fitness journey.
        </p>
        <div className="p-4 mt-4 rounded-lg bg-green-50">
          <p className="text-sm text-green-700">💡 Daily Tip: {randomTip}</p>
        </div>
      </div>
      {/* Nutrition Summary */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
          Nutrition Summary
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        {/* Today Calories */}
        <Card className="col-span-1">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Today&apos;s Nutrition
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Calories</span>
            <span className="font-medium">
              {Math.ceil(totals.calories)}{" "}
              {getTarget[0]?.Bmr?.totalDailyCaloricNeeds?.unit ?? "kcal"} /{" "}
              {Math.ceil(getTarget[0]?.Bmr?.totalDailyCaloricNeeds?.value ?? 0)}{" "}
              {getTarget[0]?.Bmr?.totalDailyCaloricNeeds?.unit ?? "kcal"}
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Protein</span>
              <span>
                {Math.ceil(totals.protein)}
                {getTarget[0]?.Bmr?.protein?.unit ?? "g"} /{" "}
                {Math.ceil(getTarget[0]?.Bmr?.protein?.preferred ?? 0)}
                {getTarget[0]?.Bmr?.protein?.unit ?? "g"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Carbs</span>
              <span>
                {Math.ceil(totals.carb)}
                {getTarget[0]?.Bmr?.carbohydrates?.unit ?? "g"} /{" "}
                {Math.ceil(getTarget[0]?.Bmr?.carbohydrates?.preferred ?? 0)}
                {getTarget[0]?.Bmr?.carbohydrates?.unit ?? "g"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Fat</span>
              <span>
                {Math.ceil(totals.fat)}
                {getTarget[0]?.Bmr?.fat?.unit ?? "g"} /{" "}
                {Math.ceil(getTarget[0]?.Bmr?.fat?.preferred ?? 0)}
                {getTarget[0]?.Bmr?.fat?.unit ?? "g"}
              </span>
            </div>
          </div>
        </Card>

        {/* Water Tracker */}
        <WaterTracker />
      </div>

      {/* BMI And BMR Summary */}
      <div className="mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="p-5 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">BMI</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-green-600">
                {getTarget[0]?.Bmi.bmi ?? 0} {getTarget[0]?.Bmi.unit ?? "kg/m²"}
              </p>
              <p className="text-gray-500 mt-1">
                {getTarget[0]?.Bmi.bmiStatus ?? ""}
              </p>
            </div>
          </div>
          <div className="p-5 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">BMR</h3>
            <p className="text-2xl font-bold text-green-600">
              {getTarget[0]?.Bmr.BMR.value} {getTarget[0]?.Bmr.BMR.unit}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${recentMeals.length > 0 ? "mb-8" : ""}`}>
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/food-log"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-green-50"
          >
            <FaUtensils className="text-green-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Log a Meal
            </span>
          </Link>
          <Link
            to="/diet-recommendation"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50"
          >
            <FaCalculator className="text-blue-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Calculator
            </span>
          </Link>
          <Link
            to="/browse-foods"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-orange-50"
          >
            <FiSearch className="text-orange-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Explore Recipes
            </span>
          </Link>
          <Link
            to="/assistant"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-teal-50"
          >
            <BsChatRightDotsFill className="text-teal-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Ai Assistant
            </span>
          </Link>
        </div>
      </div>

      {/* Recent Nutrition Log */}
      {recentMeals.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Recent Nutrition Log
            </h2>
          </div>

          <div className="space-y-4">
            {recentMeals?.map((meal) => (
              <RecentLog key={meal.id} meal={meal} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
