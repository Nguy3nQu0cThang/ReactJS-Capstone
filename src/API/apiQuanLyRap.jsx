import PurePanel from "antd/es/tooltip/PurePanel";
import { http } from "../utils/setting";

export const getListCinemaAPI = async () => {
  try {
      const res = await http.get("/api/QuanLyRap/LayThongTinHeThongRap");
      return res.data.content;
  } catch (err){
    console.log("Error List Cinema", err)
    }
  };

export const getListMovieOfCinemaAPI = async () => {
  try {
    const res = await http.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01")
    return res.data.content
  } catch (err) {
    console.log("Error List Movie of Cinema", err)
  }
}