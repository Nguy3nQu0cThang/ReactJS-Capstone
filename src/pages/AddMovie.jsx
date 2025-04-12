import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { TOKEN_CYBERSOFT } from "../utils/setting";

const AddMovie = () => {
  const navigate = useNavigate();

  const movieForm = useFormik({
    initialValues: {
      maPhim: "",
      tenPhim: "",
      trailer: "",
      hinhAnh: "",
      moTa: "",
      ngayKhoiChieu: "",
      danhGia: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
          values,
          {
            headers: {
              TokenCyberSoft: TOKEN_CYBERSOFT,
            },
          }
        );
        console.log(res);
        alert("Thêm phim thành công!");
        navigate("/admin");
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
          <div>
            <label className="block">Mã phim</label>
            <input
              name="maPhim"
              type="text"
              className="form-control"
              onChange={movieForm.handleChange}
            />
          </div>
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
            <label className="block">Hình ảnh (URL)</label>
            <input
              name="hinhAnh"
              type="text"
              className="form-control"
              onChange={movieForm.handleChange}
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
