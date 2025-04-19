import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { TOKEN, TOKEN_CYBERSOFT } from "../utils/setting";
import { useState } from "react";

const AddMovie = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  // Hàm chuyển đổi định dạng ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2); // Lấy ngày và định dạng với 2 chữ số
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Lấy tháng (tháng bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm

    return `${day}/${month}/${year}`; // Trả về định dạng dd/MM/yyyy
  };

  const movieForm = useFormik({
    initialValues: {
      maPhim: "",
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      danhGia: "",
      dangChieu: false,
      sapChieu: true,
      hot: true,
      maRap: "",
      giaVe: "",
      gioChieu: "",
    },
    onSubmit: async (values) => {
      try {
        // Tạo formData để gửi
        const formData = new FormData();
        formData.append("tenPhim", values.tenPhim);
        formData.append("trailer", values.trailer);
        formData.append("moTa", values.moTa);

        // Sử dụng hàm formatDate để chuyển ngày sang định dạng dd/MM/yyyy
        formData.append("ngayKhoiChieu", formatDate(values.ngayKhoiChieu));

        formData.append("danhGia", values.danhGia);
        formData.append("dangChieu", values.dangChieu);
        formData.append("sapChieu", values.sapChieu);
        formData.append("hot", values.hot);

        if (selectedImage) {
          formData.append("hinhAnh", selectedImage, selectedImage.name);
        } else {
          alert("Vui lòng chọn hình ảnh!");
          return;
        }

        // Kiểm tra các giá trị trong formData trước khi gửi
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        // Gửi yêu cầu POST đến API
        const res = await axios.post(
          "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
          formData,
          {
            headers: {
              TokenCyberSoft: TOKEN_CYBERSOFT,
            },
          }
        );

        const maPhim = response.data.content.maPhim;

        // Chuẩn bị lịch chiếu
        const ngayGioChieu = `${formatDate(values.ngayKhoiChieu)} ${
          values.gioChieu
        }`;

        // Gọi API tạo lịch chiếu
        await axios.post(
          "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
          {
            maPhim,
            maRap: values.maRap,
            ngayChieuGioChieu: ngayGioChieu,
            giaVe: Number(values.giaVe),
          },
          {
            headers: {
              TokenCyberSoft: TOKEN_CYBERSOFT,
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        console.log(res);
        alert("Thêm phim thành công!");
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        const taiKhoan = userLogin ? userLogin.taiKhoan : null;
        if (taiKhoan) {
          navigate(`/admin/${taiKhoan}`);
        } else {
          alert("Tài khoản không hợp lệ!");
        }
        navigate(`/admin/${taiKhoan}`);
      } catch (error) {
        console.error("Lỗi thêm phim:", error);
        alert("Thêm phim thất bại!");
      }
    },
  });

  return (
    <div className="container mx-auto p-5 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Thêm phim mới</h3>
      <form onSubmit={movieForm.handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* <div>
            <label className="block">Mã phim</label>
            <input
              name="maPhim"
              type="text"
              className="form-control"
              onChange={movieForm.handleChange}
            />
          </div> */}
          <div>
            <label className="block">Tên phim</label>
            <input
              name="tenPhim"
              type="text"
              className="form-control"
              onChange={movieForm.handleChange}
            />
          </div>
          <div>
            <label className="block">Trailer</label>
            <input
              name="trailer"
              type="text"
              className="form-control"
              onChange={movieForm.handleChange}
            />
          </div>
          <div>
            <label className="block">Hình ảnh</label>
            <input
              name="hinhAnh"
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                setSelectedImage(file);
              }}
            />
          </div>
          <div className="col-span-2">
            <label className="block">Mô tả</label>
            <textarea
              name="moTa"
              className="form-control"
              onChange={movieForm.handleChange}
            ></textarea>
          </div>
          <div>
            <label className="block">Ngày khởi chiếu</label>
            <input
              name="ngayKhoiChieu"
              type="date"
              className="form-control"
              onChange={movieForm.handleChange}
            />
          </div>
          <div className="col-span-2">
            <label className="block">Mã rạp</label>
            <input
              name="maRap"
              type="text"
              className="form-control"
              onChange={movieForm.handleChange}
            />
          </div>
          <div>
            <label className="block">Giá vé</label>
            <input
              name="giaVe"
              type="number"
              className="form-control"
              onChange={movieForm.handleChange}
            />
          </div>
          <div>
            <label className="block">Giờ chiếu (HH:mm)</label>
            <input
              name="gioChieu"
              type="time"
              className="form-control"
              onChange={movieForm.handleChange}
            />
          </div>

          <div>
            <label className="block">Đánh giá</label>
            <input
              name="danhGia"
              type="number"
              min={1}
              max={10}
              className="form-control"
              onChange={movieForm.handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Thêm phim
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
