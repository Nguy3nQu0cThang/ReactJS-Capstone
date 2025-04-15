import { http } from "../utils/setting";

export const bookingAPI = async (maLichChieu) => {
  try {
    const res = await http.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
    console.log(res)
    return res.data.content;
  } catch (err) {
    console.log("Error Danh sách phòng vé", err);
    throw err
  }
};

export const bookingTicketAPI = async (payload) => {
  try {
    const res = await http.post("/api/QuanLyDatVe/DatVe", payload);
    return res.data.content;
  } catch (err) {
    console.log("Error Đặt vé", err);
    throw err;
  }
};