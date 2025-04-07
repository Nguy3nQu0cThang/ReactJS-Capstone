import axios from "axios";
import { http } from "../utils/setting";

const apiBase = "https://movienew.cyberlearn.edu.vn/api/QuanLyPhim";

export const getAPIQuanLyPhimBanner = async () => {
  try {
    const res = await axios.get(`${apiBase}/LayDanhSachBanner`)
    return res.data.content
  } catch (err) {
    console.log("Error Banner", err)
  }
}

export const getMovieListAPI=async()=>{
  const res= await http.get(`${apiBase}/LayDanhSachPhim`)
  return res.data.content
}
  