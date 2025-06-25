import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function AppLayout() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <NavBar />
      <main className="p-3 pt-20 md:px-5 md:pb-5">
        <div className="w-full mx-auto bg-white shadow-xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
