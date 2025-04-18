import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/reducer/userReducer";

const HeaderHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogin } = useSelector((state) => state.userReducer);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/"); // Optional: chuyển về trang chủ sau logout
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-around p-4 bg-white shadow-md relative">
      <div>
        <Link
          to="/"
          className="text-xl font-bold text-black text-decoration-none"
        >
          Cinema
        </Link>
      </div>

      <nav className="hidden lg:flex space-x-10">
        <Link
          to="/"
          className="text-black hover:text-blue-600 text-decoration-none"
        >
          Trang chủ
        </Link>
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

      <div>
        {userLogin ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center space-x-2 text-black focus:outline-none"
            >
              <span>👤 Xin chào{userLogin.hoTen}</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
                <Link
                  to={`/profile/:${userLogin.taiKhoan}`}
                  className="block px-4 py-2 hover:bg-gray-100 text-black text-decoration-none"
                  onClick={() => setDropdownOpen(false)}
                >
                  Thông tin cá nhân
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-decoration-none"
            >
              Đăng Nhập
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900 text-decoration-none"
            >
              Đăng Ký
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderHome;
