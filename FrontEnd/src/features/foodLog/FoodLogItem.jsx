import NutritionLogItem from "../../ui/NutritionLogItem";
import useDeleteFood from "./useDeleteFood";
import formatDateToYYYYMMDD from "../../ui/DateFormat";
/* eslint-disable react/prop-types */
function FoodLogItem({ log }) {
  const { deleteFood, isPending: isDeletePending } = useDeleteFood();
  return (
    <NutritionLogItem
      id={log.id}
      name={log.mealName}
      date={formatDateToYYYYMMDD(log.created_at)}
      mealType={log.mealType}
      calories={log.calories}
      carbs={log.carb}
      protein={log.protein}
      fat={log.fat}
      sugar={log.sugar}
      sodium={log.sodium}
      cholesterol={log.cholesterol}
      fiber={log.fiber}
      onDelete={() => {
        deleteFood(log.mealId);
      }}
      isDeleting={isDeletePending ? true : false}
      showDetailsButton={false}
    />
  );
}

export default FoodLogItem;
