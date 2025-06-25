/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaFire, FaCubes, FaDrumstickBite } from "react-icons/fa";
import Card from "../../ui/Card";

function Results({ recipe }) {
  const Name =
    recipe.Name.split(" ").length > 3
      ? recipe.Name.split(" ").slice(0, 3).join(" ") + "..."
      : recipe.Name;

  return (
    <Card
      key={recipe.RecipeId}
      className="flex flex-col h-full overflow-hidden"
    >
      <div className="w-full h-48 overflow-hidden aspect-[16/9]">
        <img
          src={recipe.Images[0] || "/15.15.37_4f397ebf.jpg"}
          loading="lazy"
          alt={recipe.Name || "Recipe image"}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="mb-2 text-lg font-semibold text-center text-nowrap">
          {Name}
        </h3>
        <div className="mt-auto">
          <div className="flex justify-between mb-4 text-sm">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 font-medium">
                <FaFire className="text-red-500" size={18} />
                {Math.ceil(recipe?.Calories) || "N/A"}kcal
              </div>
              <span className="text-xs text-gray-500">Calories</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 font-medium">
                <FaCubes className="text-blue-500" size={18} />
                {Math.ceil(recipe?.SugarContent) || "N/A"}g
              </div>
              <span className="text-xs text-gray-500">Sugar</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 font-medium">
                <FaDrumstickBite className="text-green-500" size={18} />
                {Math.ceil(recipe?.ProteinContent) || "N/A"}g
              </div>
              <span className="text-xs text-gray-500">Protein</span>
            </div>
          </div>

          <Link
            className="block w-full px-4 py-2 text-center text-white transition-colors duration-200 bg-green-600 rounded-lg hover:bg-green-700"
            to={`/browse-foods/${recipe.RecipeId}`}
          >
            View Recipe
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default Results;
