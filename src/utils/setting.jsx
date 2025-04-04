import axios from "axios";
//Chuyển hướng trang khi không dùng hook
import { createBrowserHistory } from "history";
export const TOKEN = "accessTOKEN";
export const USER_LOGIN = "userlogin";
export const navigateHistory = createBrowserHistory();
export function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

//setup interceptor (middleware) cho tất các request(thông tin được gửi đi đến server) và response (kết quả nhận từ server)
const DOMAIN = "https://apistore.cybersoft.edu.vn";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJUZXN0aW5nIDA0IiwiSGV0SGFuU3RyaW5nIjoiMDEvMTIvMjAyNSIsIkhldEhhblRpbWUiOiIxNzY0NTQ3MjAwMDAwIiwibmJmIjoxNzQwNTg5MjAwLCJleHAiOjE3NjQ2OTQ4MDB9.0mXLU2vygmpCOgJ_EA-Lr0C7fYh7fPC6gSUzVDLlrmg";

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 3000, // giới hạn thời gian chờ kết quả
});

//cấu hình cho request
http.interceptors.request.use((req) => {
  req.headers = {
    //giữ lại các api có header
    ...req.headers,
    //thêm phần chung authorize
    Authorization: localStorage.getItem(TOKEN),
    TokenCybersoft: TOKEN_CYBERSOFT,
  };
  return req;
});

http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const jwtDecodeToken = decodeJWT(localStorage.getItem(TOKEN));
    if (jwtDecodeToken) {
      //khi decode token thành công thì mới check token hết hạn hay chưa để rếh token
      let isExpired = isTokenExpired(localStorage.getItem(TOKEN));
      //nếu trước khi gửi token thì sẻver mà token hết hạn thì gọi api refresh token
      if (isExpired) {
        try {
          const response = await axios({
            url: "https://apistore.cybersoft.edu.vn/api/Users/RefeshToken",
            method: "POST",
            headers: {
              Authorization: localStorage.getItem(TOKEN),
            },
            //Nếu thành công thì lưu lại token mới
          });
          localStorage.setItem(TOKEN, response.data.content.accessToken);
          navigateHistory.push(window.location.pathname);
        } catch (err) {
          //Nếu refresh thất bại thì yêu cầu login lại
          navigateHistory.push("/loginWithFormilk");
        }
      }
    }
    console.log(err.response.status, "lỗi");
    switch (err.response.status) {
      case 400:
        {
          //chuyển hướng trang khi sai tham số
          alert("Sai tham số");
          //Điều hương trang
          navigateHistory.push("/");
        }
        break;
      case 401:
        {
          //trường hợp 1: token hết hạn -> refresh token hoặc đăng nhập
          //trường hợp 2: Token không hợp lệ -> đăng nhập
          navigateHistory.push("/loginWithFormilk");
        }
        break;
      case 404:
        {
          alert("Đường dẫn không tồn tại");
          navigateHistory.push("/");
        }
        break;
      case 403:
        {
          //token hợp lệ tuy nhiên chưa đủ quyền truy cập
          alert("Yêu cầu quản trị viên thì mới có thể vào được");
          navigateHistory.push("/");
        }
        break;
      case 500:
        {
          alert("Lỗi hệ thống");
          navigateHistory.push("/");
        }
        break;
    }
    return Promise.reject(err);
  }
);

//cầu hình cho response

/**
 * status code
 * 200: thành công
 * 201: dữ liệu đã được khởi tạo thành công
 *
 * 400: bad request (đường dẫn không hợp lệ)
 * 401: unauthorize(lỗi không quyền truy cập vào api đso)
 * 404: Not found (không tìm thấy dữ liệu)
 * 403: Forbidden (không đủ quyền truy cập vào hệ thống) role
 *
 * 500: error in server (lỗi xảy ra tại server chưa biết lí do)
 * => vai trò frontend với lỗi 500:
 *  +test lại api qua postman hoặc swagger với dữ liệu mẫu từ backend(BE đúng thì coi lại code). Nếu như postman hay swagger bị sai thì báo backend xử lý
 */

// Hàm để decode JWT
function decodeJWT(token) {
  try {
    // Tách phần payload từ token (JWT có 3 phần: header.payload.signature)
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid JWT token:", e);
    return null;
  }
}

// Hàm kiểm tra token có hết hạn không
function isTokenExpired(token) {
  const decoded = decodeJWT(token);

  if (!decoded || !decoded.exp) {
    return true; // Token không hợp lệ hoặc không có thời gian hết hạn
  }

  // exp trong JWT là timestamp tính bằng giây
  const expirationDate = new Date(decoded.exp * 1000);
  const currentDate = new Date();

  return expirationDate < currentDate;
}
