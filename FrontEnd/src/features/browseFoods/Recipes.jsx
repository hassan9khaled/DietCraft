import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecipes } from "../../context/RecipesContext";
import { CiSearch, CiCircleRemove } from "react-icons/ci";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import Result from "./Results";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function Recipes() {
  const [isOpen, setOpen] = useState(false);
  const items = ["recipe", "ingredient"];
  const { data = [], isLoading } = useRecipes();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromParams = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromParams);
  const postsPerPage = 12;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const valueFromParams = searchParams.get("value") || "";
  const [searchTerm, setSearchTerm] = useState(valueFromParams);
  const [searchBy, setSearchBy] = useState(
    searchParams.get("searchBy") || "recipe"
  );

  let filterData = data;

  if (searchBy === "recipe") {
    filterData = data?.filter((recipe) =>
      recipe.Name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else if (searchBy === "ingredient") {
    const searchWords = searchTerm.toLowerCase().split(/\s+/); // split by space(s)
    filterData = data?.filter((recipe) =>
      searchWords.every((word) =>
        recipe.RecipeIngredientParts?.some((part) =>
          part.toLowerCase().includes(word)
        )
      )
    );
  }

  const currentPosts = filterData?.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    setSearchTerm(valueFromParams);
  }, [valueFromParams]);

  useEffect(() => {
    const newParams = { page: currentPage, value: searchTerm, searchBy };
    if (currentPage > 84) {
      newParams.page = 84;
      setCurrentPage(84);
    }
    setSearchParams(newParams);
  }, [currentPage, searchTerm, searchBy, setSearchParams]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setSearchParams({ page: 1, searchBy });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-4 mx-auto md:p-5 p-3">
      <div>
        <h1 className="mb-3 font-bold text-gray-800 text-3xl text-center md:text-left">
          Featured Recipes
        </h1>
        <p className="text-sm text-center text-gray-600 md:text-left">
          Discover delicious and healthy recipes tailored to your needs.
        </p>
      </div>
      {/* Search Bar & Button */}
      <div className="flex flex-col-reverse items-center w-full gap-3 md:flex-row md:gap-4">
        <div className="relative w-full md:w-3/4 h-11">
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
              setSearchParams({ value: e.target.value, page: 1, searchBy });
            }}
            className={`w-full h-full py-2.5 px-5 transition-all border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 ${searchBy === "ingredient" ? "ring-blue-500" : "ring-green-500"}`}
          />
          {searchTerm ? (
            <CiCircleRemove
              size={22}
              onClick={handleClearSearch}
              className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer top-1/2 right-4 hover:text-red-500"
            />
          ) : (
            <CiSearch
              size={22}
              className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 right-4"
            />
          )}
        </div>
        <div className="relative w-full md:w-1/4 h-11">
          <button
            onClick={() => setOpen((e) => !e)}
            className={`h-full ${searchBy === "ingredient" ? "bg-blue-600 hover:bg-blue-800 focus:ring-blue-300" : "bg-green-600 hover:bg-green-800 focus:ring-green-300"} gap-2 text-white w-full text-center focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center`}
            type="button"
          >
            Search by {searchBy.charAt(0).toUpperCase() + searchBy.slice(1)}{" "}
            {isOpen ? (
              <IoIosArrowDropup size={20} />
            ) : (
              <IoIosArrowDropdown size={20} />
            )}
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
              <ul className="py-2 text-sm text-gray-700">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <li
                      key={index}
                      className="block px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                      onClick={() => {
                        setSearchBy(item);
                        setSearchParams({
                          searchBy: item,
                          value: searchTerm,
                          page: 1,
                        });
                        setCurrentPage(1);
                        setOpen(false);
                      }}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No results</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Recipes List */}
      {currentPosts.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((recipe) => (
            <Result key={recipe.RecipeId} recipe={recipe} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center py-10">
          <p className="text-gray-500">No recipes found.</p>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPosts={filterData ? filterData.length : 0}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Recipes;
