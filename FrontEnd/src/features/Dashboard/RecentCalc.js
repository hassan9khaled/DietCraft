function getRecentMeals(meals, count = 3) {
  if (!Array.isArray(meals)) return [];

  return meals
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, count);
}

function summarizeTodaysMeals(meals) {
  const today = new Date().toISOString().split("T")[0];

  const todaysMeals = meals?.filter((meal) => {
    const mealDate = new Date(meal.created_at).toISOString().split("T")[0];
    return mealDate === today;
  });

  const totals = todaysMeals?.reduce(
    (acc, meal) => {
      acc.calories += meal.calories || 0;
      acc.carb += meal.carb || 0;
      acc.fat += meal.fat || 0;
      acc.protein += meal.protein || 0;
      return acc;
    },
    { calories: 0, carb: 0, fat: 0, protein: 0 }
  );

  return { totals, todaysMeals };
}

export { getRecentMeals, summarizeTodaysMeals };
