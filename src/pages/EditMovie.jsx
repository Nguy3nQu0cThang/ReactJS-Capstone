import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { TOKEN, TOKEN_CYBERSOFT } from "../utils/setting";

const EditMovie = () => {
  const params = useParams();
  const { maPhim } = params;
  const navigate = useNavigate();

  console.log(maPhim);

  const movieForm = useFormik({
    initialValues: {
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      trailer: "",
      hinhAnh: null, // Thay đổi từ chuỗi thành null
      moTa: "",
      maNhom: "GP01",
      ngayKhoiChieu: "",
      danhGia: 0,
      hot: false,
      dangChieu: false,
      sapChieu: false,
    },
    onSubmit: async (values) => {
      const formData = new FormData();

      // Append tất cả các giá trị form vào FormData
      for (const key in values) {
        if (key === "hinhAnh" && values[key]) {
          formData.append(key, values[key]); // append file nếu có
        } else {
          formData.append(key, values[key]);
        }
      }

      try {
        const res = await axios.post(
          `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Đặt Content-Type là multipart/form-data
              TokenCybersoft: TOKEN_CYBERSOFT,
              Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
            },
          }
        );
        console.log(res);
        alert("Cập nhật thành công!");
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        const taiKhoan = userLogin ? userLogin.taiKhoan : null;
        if (taiKhoan) {
          navigate(`/admin/${taiKhoan}`);
        } else {
          alert("Tài khoản không hợp lệ!");
        }
        navigate(`/admin/${taiKhoan}`);

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
  }, [maPhim]);

  return (
    <div className="container mx-auto py-4">
      <h3 className="text-xl font-semibold mb-4">Edit Movie</h3>
      <form onSubmit={movieForm.handleSubmit} encType="multipart/form-data">
        {[
          { label: "Mã phim", name: "maPhim" },
          { label: "Tên phim", name: "tenPhim" },
          { label: "Bí danh", name: "biDanh" },
          { label: "Trailer", name: "trailer" },
          { label: "Mô tả", name: "moTa" },
          { label: "Ngày khởi chiếu", name: "ngayKhoiChieu", type: "date" },
          { label: "Đánh giá", name: "danhGia", type: "number" },
        ].map(({ label, name, type = "text" }) => (
          <div className="mb-4" key={name}>
            <label className="block text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={movieForm.values[name] || ""}
              onChange={movieForm.handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-gray-700">Hình ảnh</label>
          <div className="flex items-center">
            <input
              type="text"
              name="hinhAnh"
              value={
                movieForm.values.hinhAnh ? movieForm.values.hinhAnh.name : ""
              }
              readOnly
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md shadow-sm rounded me-1"
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 rounded me-1"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Chọn tệp
            </button>
            <input
              id="fileInput"
              type="file"
              name="hinhAnh"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                movieForm.setFieldValue("hinhAnh", file); // Lưu file vào form
              }}
              className="hidden"
            />
          </div>
        </div>

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
