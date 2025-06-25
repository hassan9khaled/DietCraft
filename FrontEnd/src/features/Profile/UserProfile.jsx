import { useEffect, useState } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-hot-toast";
import useUpdateUser from "../auth/useUpdateUser";
import useUser from "../auth/useUser";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";

function UserProfile() {
  const { user, isPending, isAuthenticated } = useUser();
  const { editUser, isPending: isUpdating } = useUpdateUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [originalData, setOriginalData] = useState({
    firstName: "",
    lastName: "",
    avatar: null,
  });

  // Populate user data when it loads
  useEffect(() => {
    if (user) {
      const {
        firstName = "",
        lastName = "",
        avatar = null,
      } = user.user_metadata || {};
      setFirstName(firstName);
      setLastName(lastName);
      setOriginalData({ firstName, lastName, avatar });
    }
  }, [user]);

  const hasDataChanged =
    firstName !== originalData.firstName ||
    lastName !== originalData.lastName ||
    avatar !== null;

  if (isPending) return <Spinner />;
  if (!isAuthenticated) return <p>You must log in first.</p>;

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    editUser(
      { firstName, lastName, avatar },
      {
        onSuccess: () => {
          toast.success("User updated successfully!");
          setIsEditModalOpen(false);
        },
      }
    );
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between p-4 mx-auto mb-8 bg-white rounded-lg shadow-md max-w-8xl">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          {user?.user_metadata?.avatar ? (
            <img
              src={user.user_metadata.avatar}
              alt="User Avatar"
              loading="lazy"
              className="rounded-full block w-[4rem] h-[4rem] object-cover object-center aspect-square"
            />
          ) : (
            <FaUserCircle className="text-6xl text-gray-400" />
          )}
          <div>
            <h1 className="text-lg font-bold text-gray-800 md:text-2xl">
              {user?.user_metadata?.firstName || "User"}{" "}
              {user?.user_metadata?.lastName}
            </h1>
            <p className="text-sm text-gray-600 md:text-base">{user?.email}</p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 mt-3 font-medium text-white transition-colors bg-green-600 rounded-lg max-sm:justify-center max-sm:w-full hover:bg-green-700"
          onClick={() => setIsEditModalOpen(true)}
        >
          <FaEdit /> Edit Profile
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <button
            type="button"
            onClick={() => setIsEditModalOpen(false)}
            className="text-black hover:text-[#FB0101] transition"
          >
            <IoIosClose size={40} />
          </button>
        </div>

        <form onSubmit={handleProfileUpdate}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className={`flex items-center justify-center w-full px-4 py-2 text-white ${hasDataChanged ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"} rounded-lg md:w-40`}
              disabled={!hasDataChanged || isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default UserProfile;
