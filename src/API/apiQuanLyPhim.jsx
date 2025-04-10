import { http } from "../utils/setting";

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