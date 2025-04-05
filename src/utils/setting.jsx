import axios from "axios";
// import { createBrowserHistory } from "history";

// export const navigateHistory = createBrowserHistory();
// export const TOKEN = "accessTOKEN"; // token người dùng
// export const USER_LOGIN = "userlogin"; // thông tin người dùng

export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDkiLCJIZXRIYW5TdHJpbmciOiIyMy8xMS8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NjM4NTYwMDAwMDAiLCJuYmYiOjE3NDUxNjg0MDAsImV4cCI6MTc2NDAwMzYwMH0.scsJUzMxMIDK8-ppyJvlj2lebZ2w47CsxKNu3QQU5TM";

export const DOMAIN = "https://movienew.cybersoft.edu.vn/api";

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 3000,
});

http.interceptors.request.use((req) => {
  req.headers = {
    ...req.headers,
    TokenCybersoft: TOKEN_CYBERSOFT,
    // Authorization: localStorage.getItem(TOKEN),
  };
  return req;
});
