import UpdatePassword from "../features/auth/UpdatePassword";
import UpdatePlan from "../features/Profile/UpdatePlan";
import UserProfile from "../features/Profile/UserProfile";

function Account() {
  return (
    <div className="min-h-screen p-3 md:p-6 bg-gray-50">
      {/* User Profile Section */}
      <UserProfile />
      {/* Update Your Plan */}
      <UpdatePlan />
      {/* Account Settings Section */}
      <div className="p-8 mx-auto bg-white rounded-lg shadow-md max-w-8xl">
        <UpdatePassword />
      </div>

      {/* Motivational Message */}
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <p className="text-gray-600">
          Success is the sum of small efforts, repeated day in and day out
        </p>
      </div>
    </div>
  );
}

export default Account;
