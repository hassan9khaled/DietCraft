import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useSearchParams } from "react-router-dom";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { IoBarbellOutline } from "react-icons/io5";
import { LiaCookieSolid } from "react-icons/lia";
import { subDays, subMonths, subQuarters, isWithinInterval } from "date-fns";
import AverageCard from "../features/Progress/AverageCard";
import FilterCharts from "../ui/FilterCharts";
import DropdownMenu from "../ui/DropdownMenu";
import Spinner from "../ui/Spinner";
import useGetProgress from "../features/foodLog/useGetProgress";
import useGetFood from "../features/foodLog/useGetFood";
import useUser from "../features/auth/useUser";
import formatDateToYYYYMMDD from "../ui/DateFormat";

const COLORS = ["#4CAF50", "#F59E0B", "#3B82F6", "#EF4444"];

function Progress() {
  const filterList = ["overview", "calories", "macronutrients", "meals"];
  const filterDuration = ["week", "month", "quarter"];
  const [searchParams, setSearchParams] = useSearchParams();
  const filterData = searchParams.get("filterBy") || "overview";
  const filterTime = searchParams.get("time") || "week";

  const { user } = useUser();
  const { foodData, isPending: isFoodPending } = useGetFood(user?.email);
  const { progressData, isPending: isProgressPending } = useGetProgress(
    user?.email
  );
  const mergedData = foodData?.concat(progressData);
  const isLoading = isFoodPending || isProgressPending;

  // Function to filter data based on time period
  const filterDataByTime = (data, timePeriod) => {
    if (!data) return [];

    const now = new Date();
    let startDate;

    switch (timePeriod) {
      case "week":
        startDate = subDays(now, 7);
        break;
      case "month":
        startDate = subMonths(now, 1);
        break;
      case "quarter":
        startDate = subQuarters(now, 1);
        break;
      default:
        startDate = subDays(now, 7);
    }

    return data.filter((item) => {
      const itemDate = new Date(item?.created_at);
      return isWithinInterval(itemDate, { start: startDate, end: now });
    });
  };

  const filteredData = filterDataByTime(mergedData, filterTime);

  if (isLoading) {
    return <Spinner />;
  }

  function AverageValues(value) {
    const totalValues = filteredData?.map((log) => log?.[value]);
    const averageValues =
      totalValues?.reduce((acc, current) => acc + current, 0) /
        totalValues?.length || 0;
    return parseFloat(averageValues?.toFixed(2));
  }

  const dateAndCalories = filteredData?.map((item) => ({
    date: formatDateToYYYYMMDD(item?.created_at),
    calories: item?.calories,
  }));

  const caloriesByMeal = filteredData?.reduce((acc, log) => {
    const meal = log?.mealType;
    const existing = acc.find((m) => m.meal === meal);
    if (existing) existing.calories += log?.calories;
    else acc.push({ meal, calories: log?.calories });
    return acc.map((item) => ({
      ...item,
      calories: +item?.calories?.toFixed(2),
    }));
  }, []);

  const dailyMacros = filteredData?.map((log) => ({
    date: formatDateToYYYYMMDD(log?.created_at),
    fat: log?.fat,
    carb: log?.carb,
    protein: log?.protein,
  }));

  const macrosTotal = filteredData?.reduce(
    (acc, log) => {
      acc.fat += log?.fat;
      acc.carb += log?.carb;
      acc.protein += log?.protein;
      return acc;
    },
    { fat: 0, carb: 0, protein: 0 }
  );

  const macrosPieData = [
    { name: "Fat", value: +macrosTotal?.fat?.toFixed(2) },
    { name: "Carbs", value: +macrosTotal?.carb?.toFixed(2) },
    { name: "Protein", value: +macrosTotal?.protein?.toFixed(2) },
  ];

  const macrosByMeal = filteredData?.reduce((acc, log) => {
    const meal = log?.mealType;
    const existing = acc.find((m) => m.meal === meal);
    if (existing) {
      existing.fat += +log?.fat?.toFixed(2);
      existing.carb += +log?.carb?.toFixed(2);
      existing.protein += +log?.protein?.toFixed(2);
    } else {
      acc.push({
        meal,
        fat: +log?.fat?.toFixed(2),
        carb: +log?.carb?.toFixed(2),
        protein: +log?.protein?.toFixed(2),
      });
    }
    return acc.map((item) => ({
      ...item,
      fat: +item?.fat?.toFixed(2),
      carb: +item?.carb?.toFixed(2),
      protein: +item?.protein?.toFixed(2),
    }));
  }, []);

  const chartsConfig = [
    {
      id: "1",
      category: "calories",
      title: `Daily Calorie Trend (${filterTime})`,
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dateAndCalories}>
            <XAxis dataKey="date" stroke="black" />
            <YAxis stroke="black" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="calories"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "2",
      category: "calories",
      title: `Total Calories per Meal Type (${filterTime})`,
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={caloriesByMeal}>
            <XAxis dataKey="meal" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="calories" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "3",
      category: "macronutrients",
      title: `Stacked Bar: Daily Macronutrients (${filterTime})`,
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyMacros} stackOffset="sign">
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="fat" stackId="a" fill="#EF4444" />
            <Bar dataKey="carb" stackId="a" fill="#3B82F6" />
            <Bar dataKey="protein" stackId="a" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "4",
      category: "macronutrients",
      title: `Macronutrients % Distribution (${filterTime})`,
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={macrosPieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {macrosPieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "5",
      category: "meals",
      title: `Meal-wise Macronutrients (${filterTime})`,
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={macrosByMeal}>
            <XAxis dataKey="meal" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="fat" stackId="a" fill="#EF4444" />
            <Bar dataKey="carb" stackId="a" fill="#3B82F6" />
            <Bar dataKey="protein" stackId="a" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
  ];

  return (
    <div className="p-4 text-black transition-all duration-300 bg-white rounded-lg md:p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          DietCraft Progress
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 py-5 md:grid-cols-2 lg:grid-cols-4">
        <AverageCard
          AverageName="Average Calories"
          AverageNumber={`${AverageValues("calories")} kcal`}
          isPending={isLoading}
          icon={<MdOutlineLocalFireDepartment size={20} />}
        />
        <AverageCard
          AverageName="Average Protein"
          AverageNumber={`${AverageValues("protein")} g`}
          isPending={isLoading}
          icon={<IoBarbellOutline size={20} />}
        />
        <AverageCard
          AverageName="Average Carbs"
          AverageNumber={`${AverageValues("carb")} g`}
          isPending={isLoading}
          icon={<LiaCookieSolid size={20} />}
        />
        <AverageCard
          AverageName="Average Fat"
          AverageNumber={`${AverageValues("fat")} g`}
          isPending={isLoading}
          icon={<MdOutlineLocalFireDepartment size={20} />}
        />
      </div>

      <div className="flex items-center justify-between pb-5 max-md:flex-col max-md:items-stretch">
        <div className="pb-5">
          <ul className="hidden md:flex flex-wrap bg-[#f5f5f5] gap-5 rounded-lg w-fit max-md:justify-between max-md:w-full p-1 text-gray-500">
            {filterList.map((item, index) => {
              const isActive = item === filterData;
              return (
                <li
                  key={index}
                  onClick={() =>
                    setSearchParams({ filterBy: item, time: filterTime })
                  }
                  className={`px-4 py-2 cursor-pointer rounded-lg text-sm ${
                    isActive ? "text-black bg-white" : "text-[#4b5563]"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </li>
              );
            })}
          </ul>
          <DropdownMenu
            filterData={filterData}
            filterList={filterList}
            setSearchParams={setSearchParams}
          />
        </div>
        <div className="pb-5">
          <ul className="md:flex max-md:flex max-md:flex-row flex-wrap bg-[#f5f5f5] gap-5 rounded-lg w-fit max-md:justify-between max-md:w-full p-1 text-gray-500">
            {filterDuration.map((item, index) => {
              const isActive = item === filterTime;
              return (
                <li
                  key={index}
                  onClick={() =>
                    setSearchParams({ filterBy: filterData, time: item })
                  }
                  className={`px-4 py-2 cursor-pointer rounded-lg text-sm ${
                    isActive ? "text-black bg-white" : "text-[#4b5563]"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {chartsConfig.map(
          ({ id, title, category, component }) =>
            (filterData === category || filterData === "overview") && (
              <FilterCharts key={id} title={title}>
                {component}
              </FilterCharts>
            )
        )}
      </div>
    </div>
  );
}

export default Progress;
