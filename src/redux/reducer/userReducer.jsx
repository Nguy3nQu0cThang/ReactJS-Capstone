import { createSlice } from "@reduxjs/toolkit";
import {
  http,
  navigateHistory,
  setCookie,
  TOKEN,
  USER_LOGIN,
} from "../../utils/setting";
// import { getAPIUserProfileData } from "../../API/apiUser";

let getUserLoginDefault = () => {
  if (localStorage.getItem(USER_LOGIN)) {
    const userDefault = JSON.parse(localStorage.getItem(USER_LOGIN));
    return userDefault;
  }
  return null;
};

const initialState = {
  userRegister: {
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    hoTen: "",
  },
  userLogin: getUserLoginDefault(),
  profile: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    handleChangeInputAction: (state, action) => {
      const { id, value } = action.payload;
      state.userRegister[id] = value;
    },
    setUserLoginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    setProfileAction: (state, action) => {
      state.profile = action.payload;
    },
    logoutAction: (state) => {

      state.userLogin = null
      localStorage.removeItem(USER_LOGIN)
      localStorage.removeItem(TOKEN)
    }
  },
});

export const {handleChangeInputAction, setProfileAction,setUserLoginAction, logoutAction} = userReducer.actions


export default userReducer.reducer;

export const loginAction = (userLoginModel) => {
  return async (dispatch) => {
    const res = await http.post(
      "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      userLoginModel
    );
    console.log(res.data.content);

    const token = res.data.content.accessToken;
    localStorage.setItem(TOKEN, token);

    const userLogin = JSON.stringify(res.data.content);
    localStorage.setItem(USER_LOGIN, userLogin);

    setCookie(TOKEN, token, 7);

    dispatch(setUserLoginAction(res.data.content));
    return res.data.content;
  };
};

// export const registerAction = (userRegisterModel) => {
//   return async (dispatch) => {
//     try {
//       const res = await http.post(
//         "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
//         userRegisterModel
//       );
//       console.log("Đăng ký thành công:", res.data.content);

//       // Đăng ký xong có thể chuyển hướng sang login nếu muốn:
//       navigateHistory.push("/login");
//     } catch (error) {
//       console.log(
//         "Lỗi đăng ký:",
//         error.response?.data?.message || error.message
//       );
//     }
//   };
// };

export const getProfileAction = (taiKhoan) => async (dispatch) => {
  try {
    const res = await http.post(
      "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      { taiKhoan }
    );
    dispatch(setProfileAction(res.data.content));
  } catch (err) {
    console.log(err);
    navigateHistory.push("/login");
  }
};
