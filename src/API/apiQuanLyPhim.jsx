import axios from "axios";

const apiBase = "https://movienew.cybersoft.edu.vn/api/QuanLyPhim";

export const getAPIQuanLyPhimBanner = async () => {
  try {
    const res = await axios.get(`${apiBase}/LayDanhSachBanner`)
    return res.data.content
  } catch (err) {
    console.log("Error Banner", err)
  }
}
  