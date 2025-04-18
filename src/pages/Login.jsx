import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginAction } from "../redux/reducer/userReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const frmLogin = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: async (values) => {
      const user = await dispatch(loginAction(values));
      console.log(user);
      if (user) {
        navigate("/");
      }
    },
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center mt-5">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Đăng nhập
          </h2>
          <form onSubmit={frmLogin.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="taiKhoan"
              >
                Tài Khoản
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="taiKhoan"
                type="text"
                placeholder="Nhập tài khoản"
                required
                name="taiKhoan"
                onChange={frmLogin.handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="matKhau"
              >
                Mật Khẩu
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="matKhau"
                type="password"
                placeholder="Nhập mật khẩu"
                name="matKhau"
                onChange={frmLogin.handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="text-white bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
Đăng nhập              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
