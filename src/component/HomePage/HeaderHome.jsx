import React from "react";
import { Link, NavLink } from "react-router-dom";
const HeaderHome = () => {
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
        <Link to="/login" className="btn me-2">
          Đăng Nhập
        </Link>
        <Link to="/register" className="btn">
          Đăng Ký
        </Link>
      </div>
    </div>
  );
};

export default HeaderHome;
