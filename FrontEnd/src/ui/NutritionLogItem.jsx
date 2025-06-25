/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import SpinnerMini from "./SpinnerMini";

function NutritionLogItem({
  id,
  name,
  date,
  mealType,
  calories,
  carbs,
  protein,
  fat,
  sugar,
  sodium,
  cholesterol,
  fiber,
  onDelete,
  isDeleting,
  fromRecipe = false,
  showDetailsButton = false
}) {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const nutritionDetails = [
    `${calories} kcal`,
    `${carbs}g Carbs`,
    `${protein}g Protein`,
    `${fat}g Fat`,
    showDetails && `${sugar}g Sugar`,
    showDetails && `${sodium}mg Sodium`,
    showDetails && `${cholesterol}mg Cholesterol`,
    showDetails && `${fiber}g Fiber`
  ]
    .filter(Boolean) // Remove falsy values (e.g., undefined)
    .join(" | ");

  return (
    <div className="flex flex-col items-center justify-between py-2 border-b sm:flex-row">
      {/* Name, Meal Type, and Nutrition Details */}
      <div className="w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">
            {fromRecipe ? (
              <Link
                to={`/browse-foods/${id}`}
                className="hover:underline hover:text-blue-600"
              >
                {name}
              </Link>
            ) : (
              name
            )}{" "}
            <span className="text-sm font-normal text-gray-600">
              ({mealType})
            </span>{" "}
            <span className="text-sm font-normal text-gray-600">({date})</span>
          </p>
        </div>
        {/* Nutrition Details */}
        <p className="text-sm text-gray-600">{nutritionDetails}</p>
      </div>

      {/* Buttons: Show More/Less and Delete */}
      <div className="flex justify-end w-full gap-2 mt-2 sm:w-auto sm:mt-0">
        {/* Conditionally render Show More/Less button */}
        {showDetailsButton && (
          <button
            onClick={toggleDetails}
            className="px-4 py-2 text-sm text-white transition-colors bg-blue-500 rounded-lg focus:outline-none hover:bg-blue-700"
          >
            {showDetails ? "Show Less" : "Show More"}
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={() => onDelete(id)}
          className="flex items-center justify-center w-24 gap-1 px-4 py-2 text-sm text-white transition-colors bg-red-500 rounded-lg hover:bg-red-700 focus:outline-none"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <SpinnerMini />
          ) : (
            <>
              Delete <FiTrash2 />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default NutritionLogItem;
