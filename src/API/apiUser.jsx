import axios from "axios";
import { http } from "../utils/setting";
const apiBase = "https://movienew.cyberlearn.edu.vn/api";


//API đăng nhập
export const userLoginAPI = async (loginData) => {
  try {
    const res = await http.post(
      `${apiBase}/QuanLyNguoiDung/DangNhap`,
      loginData
    );
    return res.data.content
  } catch (err) {
    console.log("Error Banner", err)
  }
}

//API đăng kí
export const userRegisterAPI = async (userRegister) => {
  try {
    const res = await axios.post(
      `${apiBase}/QuanLyNguoiDung/DangKy`,
      userRegister
    );
    console.log("API Res", res)
    return res.data.content;
  } catch (err) {
    console.log("Error Banner", err);
  }
};

//API lấy danh sách
export const getAPIUserProfileData = async () => {
  try {
    const res = await axios.get(
      `${apiBase}/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`
    );
    return res.data.content;
  } catch (err) {
    console.log("Error Banner", err);
  }
};
  