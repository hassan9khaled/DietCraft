/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const Dropdown = ({ filterData, filterList, setSearchParams }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block w-full text-left md:hidden">
      <button
        onClick={toggleDropdown}
        className="text-white w-full justify-center bg-[#16a34a] hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {filterData.charAt(0).toUpperCase() + filterData.slice(1)}
        {isOpen ? (
          <IoIosArrowDropup size={20} className="ms-1" />
        ) : (
          <IoIosArrowDropdown size={20} className="ms-1" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg">
          <ul className="py-2 text-sm text-gray-700">
            {filterList.map((item, index) => {
              const isActive = item === filterData;
              return (
                <li
                  key={index}
                  onClick={() => {
                    setSearchParams({ filterBy: item });
                    setIsOpen(false);
                  }}
                  className={`block px-4 py-2 cursor-pointer rounded-lg text-sm ${
                    isActive ? "text-black bg-white" : "text-[#4b5563] "
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
