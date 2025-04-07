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
    <div className="d-flex align-items-center justify-content-around">
      <div>
        <a className="navbar-brand" href="#">
          Navbar
        </a>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-lg-0">
              <li className="nav-item ">
                <a className="nav-link mx-5" aria-current="page" href="#">
                  Trang chủ
                </a>
              </li>
              <li className="nav-item mx-5">
                <a className="nav-link" href="#">
                  Liên hệ
                </a>
              </li>
              <li className="nav-item mx-5">
                <a className="nav-link" href="#">
                  Tin tức
                </a>
              </li>
              <li className="nav-item mx-5">
                <a className="nav-link">Ứng dụng</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="">
        {userLogin ? (
          <div className="d-flex align-items-center gap-2">
            <span className="me-2">👤 {userLogin.hoTen}</span>
            <button onClick={handleLogout} className="btn btn-danger">
              Đăng xuất
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary me-2">
              Đăng Nhập
            </Link>
            <Link to="/register" className="btn btn-dark">
              Đăng Ký
            </Link>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderHome;
