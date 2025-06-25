/* eslint-disable react/prop-types */
import useDeleteIngredients from "./useDeleteIngredients";
import NutritionLogItem from "../../ui/NutritionLogItem";
import formatDateToYYYYMMDD from "../../ui/DateFormat";

function IngredientsLogItem({ progress }) {
  const { deleteIngredients, isPending: isDeleting } = useDeleteIngredients();
  return (
    <NutritionLogItem
      id={progress.IngredientsId}
      name={
        progress.mealName.charAt(0) + progress.mealName.slice(1).toLowerCase()
      }
      mealType={progress.mealType}
      calories={progress.calories}
      carbs={progress.carb}
      date={formatDateToYYYYMMDD(progress.created_at)}
      protein={progress.protein}
      fat={progress.fat}
      sugar={progress.sugar}
      sodium={progress.sodium}
      cholesterol={progress.cholesterol}
      fiber={progress.fiber}
      onDelete={deleteIngredients}
      isDeleting={isDeleting}
      showDetailsButton={true}
      fromRecipe={progress.fromRecipes}
    />
  );
}

export default IngredientsLogItem;
