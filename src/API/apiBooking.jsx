import { http } from "../utils/setting";

export const bookingAPI = async (maLichChieu) => {
  try {
    const res = await http.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
    console.log("res.data từ API booking:", res.data);
    console.log("content từ API booking:", res.data.content);

    return res.data.content;
  } catch (err) {
    console.log("Error Banner", err?.response?.data || err.message || err);
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

export const getLichChieuTheoPhimAPI = async (maPhim) => {
  const res = await http.get(
    `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
  );
  console.log("Lịch chiếu theo phim:", res.data.content);
  return res.data.content;
};
