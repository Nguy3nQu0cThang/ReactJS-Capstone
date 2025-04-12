import { http, TOKEN_CYBERSOFT } from "../utils/setting";

export const getAPIQuanLyPhimBanner = async () => {
  try {
    const res = await http.get("/api/QuanLyPhim/LayDanhSachBanner");
    return res.data.content;
  } catch (err) {
    console.log("Error Banner", err);
  }
};

export const getMovieListAPI = async () => {
  try {
    const res = await http.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
    return res.data.content;
  } catch (err) {
    console.log("Error Movie List", err);
  }

};

export const deleteMovieAPI = async (maPhim) => {
  const res = await http.delete(
    `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
    {
      headers: {
        TokenCyberSoft: TOKEN_CYBERSOFT
      },
    }
  );
  return res.data.content;
};