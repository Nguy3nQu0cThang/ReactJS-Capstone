import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { TOKEN_CYBERSOFT } from "../utils/setting";
// import dayjs from "dayjs";

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
        const accessToken = localStorage.getItem("accessToken"); // hoặc lấy từ Redux: userLogin.accessToken
        const formData = new FormData();

        for (let key in values) {
          if (key === "hinhAnh") {
            if (values.hinhAnh instanceof File) {
              formData.append("File", values.hinhAnh); // KEY là "File"
            }
          } else {
            formData.append(key, values[key]);
          }
        }

        console.log("FormData gửi đi:");
        for (let [key, val] of formData.entries()) {
          console.log(`${key}:`, val);
        }

        await axios.post(
          "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
          formData,
          {
            headers: {
              TokenCybersoft: TOKEN_CYBERSOFT,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        alert("Cập nhật thành công!");
        navigate("../admin");
      } catch (error) {
        console.error("Lỗi cập nhật phim:", error);
        if (error.response?.data?.content) {
          console.error("Chi tiết:", error.response.data.content);
        }
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

        <div className="mb-4">
          <label className="block text-gray-700">Hình ảnh</label>
          <input
            type="file"
            name="hinhAnh"
            accept="image/*"
            onChange={(e) => {
              movieForm.setFieldValue("hinhAnh", e.currentTarget.files[0]);
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
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
