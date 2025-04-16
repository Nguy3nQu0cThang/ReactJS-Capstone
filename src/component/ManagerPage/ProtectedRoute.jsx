import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { userLogin } = useSelector((state) => state.userReducer);

  if (!userLogin) return <Navigate to="/login" replace />;
  if (userLogin.maLoaiNguoiDung !== "QuanTri")
    return <Navigate to="/" replace />;

  return children;
};

export default ProtectedAdminRoute;
