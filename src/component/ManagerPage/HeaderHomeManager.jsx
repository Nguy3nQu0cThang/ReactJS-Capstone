import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/reducer/userReducer";

const HeaderHomeAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogin } = useSelector((state) => state.userReducer);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };

  return (
    <div className="flex items-center justify-around p-4 bg-white shadow-md">
      <div>
        <Link
          to="/"
          className="text-xl font-bold text-black text-decoration-none"
        >
          🎬 Cinema Admin
        </Link>
      </div>

      <nav className="hidden lg:flex space-x-10">
        <Link
          to="/"
          className="text-black hover:text-blue-600 text-decoration-none"
        >
          Trang chủ
        </Link>
        {/* <Link
          to={`/admin/${userLogin.taiKhoan}`}
          className="text-black hover:text-blue-600 text-decoration-none"
        >
          Trang Admin
        </Link> */}
        <Link
          to="/detail"
          className="text-black hover:text-blue-600 text-decoration-none"
        >
          Phim
        </Link>
        <Link
          to="/cinema"
          className="text-black hover:text-blue-600 text-decoration-none"
        >
          Rạp phim
        </Link>
        <Link
          to="/booking"
          className="text-black hover:text-blue-600 text-decoration-none"
        >
          Đặt vé
        </Link>
      </nav>

      <div className="relative">
        {userLogin ? (
          <div className="flex items-center space-x-4 relative">
            <div
              className="cursor-pointer text-black font-medium flex items-center space-x-2"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <span>👤 Xin chào {userLogin.hoTen}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 top-10 bg-white shadow-lg border rounded w-40 z-10">
                <Link
                  to={`/profile/${userLogin.taiKhoan}`}
                  className="block px-4 py-2 hover:bg-gray-100 text-black text-decoration-none"
                  onClick={() => setDropdownOpen(false)}
                >
                  Thông tin cá nhân
                </Link>
                <Link
                  to={`/admin/${userLogin.taiKhoan}`}
                  className="block px-4 py-2 hover:bg-gray-100 text-black text-decoration-none"
                  onClick={() => setDropdownOpen(false)}
                >
                  Quản lý phim
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black text-decoration-none"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HeaderHomeAdmin;
