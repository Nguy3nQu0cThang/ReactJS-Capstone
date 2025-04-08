import { http } from "../utils/setting";

export const getListCinemaAPI = async () => {
  try {
      const res = await http.get("/api/QuanLyRap/LayThongTinHeThongRap");
      return res.data.content;
  } catch (err){
    console.log("Error List Cinema", err)
    }
  };

