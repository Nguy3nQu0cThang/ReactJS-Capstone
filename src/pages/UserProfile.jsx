import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../redux/reducer/userReducer";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const { taiKhoan } = useParams();
  const { profile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProfileAction(taiKhoan));
  }, [taiKhoan]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar + Thông tin */}
          <div className="md:w-1/3 flex flex-col items-center">
            <img
              src={`https://i.pravatar.cc/150?u=${profile?.taiKhoan}`}
              alt="Avatar"
              className="w-32 h-32 rounded-full mb-4 shadow-md"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {profile?.hoTen}
            </h2>
            <p className="text-gray-500">@{profile?.taiKhoan}</p>
            <button
              onClick={() => navigate(`/edit/${profile?.taiKhoan}`)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Chỉnh sửa
            </button>
          </div>

          {/* Thông tin liên hệ */}
          <div className="md:w-2/3 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Thông tin cá nhân
            </h3>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Email:</span>
              <span>{profile?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Số điện thoại:</span>
              <span>{profile?.soDT}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">
                Loại người dùng:
              </span>
              <span>{profile?.maLoaiNguoiDung}</span>
            </div>
          </div>
        </div>

        {/* Danh sách vé đã đặt */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
            🎟️ Vé đã đặt
          </h3>
          {profile?.thongTinDatVe?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.thongTinDatVe.map((ve, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <h4 className="text-md font-bold text-blue-700 mb-1">
                    {ve.tenPhim}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    🎬 Suất chiếu:{" "}
                    {new Date(ve.ngayDat).toLocaleString("vi-VN")}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    🕒 Thời lượng: {ve.thoiLuongPhim} phút
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    🏢 Rạp: {ve.danhSachGhe[0]?.tenHeThongRap} -{" "}
                    {ve.danhSachGhe[0]?.tenCumRap}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    🪑 Ghế: {ve.danhSachGhe.map((g) => g.tenGhe).join(", ")}
                  </p>
                  <p className="text-sm text-green-600 font-semibold">
                    💰 {ve.giaVe.toLocaleString()} VND
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Bạn chưa đặt vé nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
