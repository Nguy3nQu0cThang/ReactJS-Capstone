import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { TOKEN_CYBERSOFT } from "../utils/setting";

const EditMovie = () => {
  const params = useParams(); 
  const { maPhim } = params;
  const navigate = useNavigate();

  console.log(maPhim)
  const movieForm = useFormik({
    initialValues: {
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      trailer: "",
      hinhAnh: "",
      moTa: "",
      maNhom: "GP01",
      ngayKhoiChieu: "",
      danhGia: 0,
      hot: false,
      dangChieu: false,
      sapChieu: false,
    },
    onSubmit: async (values) => {
      try {
        await axios.put(
          `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload`,
          values,
          {
            headers: {
              TokenCybersoft: TOKEN_CYBERSOFT,
            },
          }
        );
        alert("Cập nhật thành công!");
        navigate("../admin");
      } catch (error) {
        console.error("Lỗi cập nhật phim:", error);
      }
    },
  });

  const fetchMovieDetail = async () => {
    try {
      const res = await axios.get(
        `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
        {
          headers: {
            TokenCybersoft: TOKEN_CYBERSOFT,
          },
        }
      );
      movieForm.setValues(res.data.content);
    } catch (error) {
      console.error("Lỗi lấy chi tiết phim:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  return (
    <div className="container mx-auto py-4">
      <h3 className="text-xl font-semibold mb-4">Edit Movie</h3>
      <form onSubmit={movieForm.handleSubmit}>
        {[
          { label: "Mã phim", name: "maPhim" },
          { label: "Tên phim", name: "tenPhim" },
          { label: "Bí danh", name: "biDanh" },
          { label: "Trailer", name: "trailer" },
          { label: "Hình ảnh", name: "hinhAnh" },
          { label: "Mô tả", name: "moTa" },
          { label: "Ngày khởi chiếu", name: "ngayKhoiChieu", type: "date" },
          { label: "Đánh giá", name: "danhGia", type: "number" },
        ].map(({ label, name, type = "text" }) => (
          <div className="mb-4" key={name}>
            <label className="block text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={movieForm.values[name]}
              onChange={movieForm.handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        ))}

        <div className="flex gap-4 mb-4">
          {[
            { label: "Hot", name: "hot" },
            { label: "Đang chiếu", name: "dangChieu" },
            { label: "Sắp chiếu", name: "sapChieu" },
          ].map(({ label, name }) => (
            <label key={name} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={name}
                checked={movieForm.values[name]}
                onChange={movieForm.handleChange}
              />
              {label}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Cập nhật phim
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
