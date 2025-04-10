import { http } from "../utils/setting";

export const bookingAPI = async (maLichChieu) => {
  try {
    const res = await http.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
    return res.data.content;
  } catch (err) {
    console.log("Error Banner", err);
    throw err
  }
};

export const bookingTicketAPI = async (payload) => {
  try {
    const res = await http.post("/api/QuanLyDatVe/DatVe", payload);
    return res.data.content;
  } catch (err) {
    console.log("Error Banner", err);
    throw err;
  }
};