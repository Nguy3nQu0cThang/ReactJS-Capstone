import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../redux/reducer/userReducer";

const UserProfile = () => {
  const { profile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const getProfileAPI = async () => {
     dispatch(getProfileAction());
  };
  useEffect(() => {
    getProfileAPI();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          User Profile
        </h2>
        <div className="space-y-4">
          {/* Email */}
          <div className="flex justify-between">
            <span className="text-gray-700 font-bold">Họ tên</span>
            <span className="text-gray-600">{profile?.hoTen}</span>
          </div>
          {/* Name */}
          <div className="flex justify-between">
            <span className="text-gray-700 font-bold">Email</span>
            <span className="text-gray-600">{profile?.email}</span>
          </div>
          {/* Phone */}
          <div className="flex justify-between">
            <span className="text-gray-700 font-bold">Số ĐT:</span>
            <span className="text-gray-600">{profile?.soDT}</span>
          </div>
        </div>
        {/* Edit Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
