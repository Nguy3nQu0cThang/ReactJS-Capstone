import axios from "axios";
import { createBrowserHistory } from "history";
export const navigateHistory = createBrowserHistory();
export const TOKEN = "accessToken"; // token người dùng
export const USER_LOGIN = "USER_LOGIN"; // thông tin người dùng

export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNSIsIkhldEhhblN0cmluZyI6IjExLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1NzU0ODgwMDAwMCIsIm5iZiI6MTczMzg1MDAwMCwiZXhwIjoxNzU3Njk2NDAwfQ.5vww18nCtO2mffvALHhzwa38Gyr82SqzU0hb0DLMGx0";

export const DOMAIN = "https://movienew.cybersoft.edu.vn";

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 3000,
});

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

function decodeJWT(token) {
  try {
    // Tách phần payload từ token (JWT có 3 phần: header.payload.signature)
    if (!token) return null;
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

http.interceptors.request.use((req) => {
  req.headers = {
    ...req.headers,
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: localStorage.getItem(TOKEN),
  };
  return req;
});

http.interceptors.response.use(
  (res) => res,
  async (err) => {
    const rawToken = localStorage.getItem(TOKEN);
    if (rawToken) {
      //khi decode token thành công thì mối check token hết hạn hay chưa để refresh token
      const isExpired = isTokenExpired(rawToken);
      //nếu trước khi gửi token về server mà token hết hạn thì gọi api refresh token
      if (isExpired) {
        try {
          const response = await axios({
            url: "https://apistore.cybersoft.edu.vn/api/Users/RefeshToken",
            method: "POST",
            headers: {
              Authorization: rawToken,
            },

            //nếu thành công thì lưu lại token mới
          });
          localStorage.setItem(TOKEN, response.data.content.accessToken);
          navigateHistory.push(window.location.pathname);
        } catch (err) {
          alert(err);
          //nếu refresh thất bại thì yêu cầu login lại
          navigateHistory.push("/login");
        }
      }
    }

    // console.log(err.response.status, "lỗi");
    switch (err?.response.status) {
      case 400:
        {
          //chuyển hướng trang khi sai tham số
          alert("sai tham số");
          //điều hướng trang
          // window.location.href = "/";
          navigateHistory.push("/");
        }
        break;

      case 404:
        {
          alert("đường dẫn không tồn tại");
          navigateHistory.push("/");
        }
        break;
      case 401:
        {
          //trường hợp 1: token hết hạn -> refesh token hoặc đăng nhập
          //trường hợp 2: token không hợp lệ -> đăng nhập
          navigateHistory.push("/login");
        }
        break;
      case 403:
        {
          //token hợp lệ tuy nhiên chưa đủ quyền truy cập
          alert("Yêu cầu quản trị viên mới có thể vào được");
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