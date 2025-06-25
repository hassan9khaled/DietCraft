import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-12 bg-[#111827] border-t">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-green-600">DietCraft</h3>
            <p className="mt-2 text-gray-300">
              Your smart companion for personalized diet planning.
            </p>
          </div>

          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-300">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-300">
              Terms
            </Link>
            <Link to="/contact" className="text-gray-300">
              Contact
            </Link>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center text-gray-300 border-t">
          <p>
            &copy; {new Date().getFullYear()} DietCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
