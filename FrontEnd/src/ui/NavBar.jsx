import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaChartBar,
  FaCalendarAlt,
  FaBook,
  FaComments,
} from "react-icons/fa";
import { PiCalculatorFill } from "react-icons/pi";
import { RiAccountCircleFill } from "react-icons/ri";
import { LuLogIn } from "react-icons/lu";
import Button from "./Button";
import useUser from "../features/auth/useUser";
import useLogout from "../features/auth/useLogout";

function Navbar() {
  const { isAuthenticated, user } = useUser();
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const fullName =
    `${user?.user_metadata.firstName || ""} ${user?.user_metadata.lastName || ""}`.trim();
  const handleLogout = () => {
    logout({}, { onSuccess: () => navigate("/") });
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome size={18} /> },
    {
      name: "Calculator",
      path: "/diet-recommendation",
      icon: <PiCalculatorFill size={18} />,
    },
    { name: "Food Log", path: "/food-log", icon: <FaCalendarAlt size={18} /> },
    { name: "Recipes", path: "/browse-foods", icon: <FaBook size={18} /> },
    { name: "Progress", path: "/progress", icon: <FaChartBar size={18} /> },
    { name: "Assistant", path: "/assistant", icon: <FaComments size={18} /> },
  ];

  return (
    <nav className="absolute top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="px-4 sm:px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center flex-shrink-0">
              {/* <span className="text-xl font-bold text-dietcraft-600">
                Diet<span className="text-dietcraft-500">Craft</span>
              </span> */}
              <img
                src="/logo_text.svg"
                alt="DietCraft Logo"
                className="h-8 w-auto"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div
            className={`${isAuthenticated ? "lg:flex hidden" : "hidden"}  lg:items-center lg:space-x-4`}
          >
            {navItems.map((item) => {
              const isActive = item.path === location.pathname;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${isActive ? "bg-dietcraft-50" : ""} text-gray-600 hover:text-dietcraft-500 hover:bg-dietcraft-50 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden space-x-2 lg:flex lg:items-center">
            {isAuthenticated ? (
              <>
                <Link to="/account">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<RiAccountCircleFill size={16} />}
                  >
                    {fullName || "Profile"}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<LuLogIn size={16} />}
                  onClick={handleLogout}
                  isPending={isPending}
                  className="w-24"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<LuLogIn size={16} />}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<RiAccountCircleFill size={16} />}
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-500 rounded-md hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dietcraft-500"
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? "Close main menu" : "Open main menu"}
              </span>
              {isOpen ? (
                <FaTimes className="block w-6 h-6" />
              ) : (
                <FaBars className="block w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`${isAuthenticated ? "flex" : "hidden"} items-center px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:text-dietcraft-500 hover:bg-dietcraft-50`}
              onClick={() => setIsOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <Link
                to="/account"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:text-dietcraft-500 hover:bg-dietcraft-50"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">
                  <RiAccountCircleFill size={18} />
                </span>
                {fullName || "Profile"}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-base font-medium text-left text-gray-600 rounded-md hover:text-dietcraft-500 hover:bg-dietcraft-50"
              >
                <span className="mr-3">
                  <LuLogIn size={18} />
                </span>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:text-dietcraft-500 hover:bg-dietcraft-50"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">
                  <LuLogIn size={18} />
                </span>
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:text-dietcraft-500 hover:bg-dietcraft-50"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">
                  <RiAccountCircleFill size={18} />
                </span>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
