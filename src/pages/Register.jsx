import { useDispatch, useSelector } from "react-redux";
import { handleChangeInputAction } from "../redux/reducer/userReducer";
import { useNavigate } from "react-router-dom";
import { http } from "../utils/setting";

const Register = () => {
  const { userRegister } = useSelector((state) => state.userReducer);
  console.log("userRegister", userRegister);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChangeInput = (e) => {
    let { id, value } = e.target;
    //tạo action pay để đưa dữ liệu lên store
    const action = handleChangeInputAction({ id, value });
    dispatch(action);
    console.log("action", action);
  };
  // const getAPIUserRegister = async (userRegister) => {
  //   try {
  //     const res = await http.post(
  //       "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
  //       userRegister
  //     );
  //     console.log("API Res", res)
  //     return res.data.content;
  //   } catch (err) {
  //     console.log("Error Banner", err);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("userRegister:", userRegister);
    try {
      const res = await http.post(
        "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
        userRegister)
      console.log(res)
      alert("đăng ký thành công");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          User Information
        </h2>
        <form onSubmit={handleSubmit}>
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
              value={userRegister.taiKhoan}
              placeholder="Nhập tài khoản"
              required
              onChange={handleChangeInput}
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
              placeholder="Nhập mật khẩu..."
              value={userRegister.matKhau}
              required
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="hoTen"
            >
              Họ và Tên
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="hoTen"
              type="text"
              placeholder="Nhập họ và tên"
              value={userRegister.hoTen}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="soDt"
            >
              Số điện thoại
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="soDt"
              type="tel"
              placeholder="Nhập số điện thoại"
              value={userRegister.soDt}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="text"
              placeholder="Nhập số email"
              value={userRegister.email}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="maNhom"
            >
              Mã Nhóm
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="maNhom"
              type="tel"
              placeholder="Nhập mã nhóm của bạn"
              value={userRegister.maNhom}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
