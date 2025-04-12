import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutAction } from "../../redux/reducer/userReducer";
const HeaderHome = () => {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.userReducer);


  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div>
      <div className="flex items-center justify-around p-4 bg-white shadow-md">
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
            <div className="flex items-center space-x-4">
              <span className="text-black">👤 {userLogin.hoTen}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Đăng xuất
              </button>
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
    </div>
  );
};

export default HeaderHome;