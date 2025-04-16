import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieListAPI } from "../../API/apiQuanLyPhim";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { getLichChieuTheoPhimAPI } from "../../API/apiBooking";
// import { Card } from "antd";

const ITEMS_PER_PAGE = 8;
const MovieList = () => {
  // const movies = ['Phim 1', 'Phim 2', 'Phim 3']
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const query = useQuery({
    queryKey: [`MovieList`],
    queryFn: getMovieListAPI,
    staleTime: 1 * 1000 * 60,
    gcTime: 1000 * 10,
  });

  const handleBookingClick = async (maPhim) => {
    try {
      const data = await getLichChieuTheoPhimAPI(maPhim);
      const firstLichChieu =
        data.heThongRapChieu?.[0]?.cumRapChieu?.[0]?.lichChieuPhim?.[0];

      if (firstLichChieu?.maLichChieu) {
        navigate(`/booking/${firstLichChieu.maLichChieu}`);
      } else {
        alert("Phim này chưa có lịch chiếu.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy lịch chiếu:", error);
      alert("Không thể lấy lịch chiếu.");
    }
  };
  if (query.isLoading) {
    return <div>Loading....</div>;
  } else if (query.error) {
    return <div>Lỗi {query.error.message}</div>;
  }

  const movies = query.data || [];
  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const currentMovies = movies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  return (
    // <div className="container mx-auto">
    //   <h3 className="text-center">Movie list</h3>
    //   <div className="grid grid-cols-4 gap-5">
    //     {query.data.map((item, index) => {
    //       return (
    //         <Card
    //           key={index}
    //           hoverable
    //           style={{ width: 200 }}
    //           cover={<img alt="..." src={item.hinhAnh} />}
    //         >
    //           <h3>{item.tenPhim}</h3>
    //           <p>{item.danhGia}</p>
    //         </Card>
    //       );
    //     })}
    //   </div>
    // </div>

    <div className="container pt-5 mb-5 movie-section">
      <h2 className="text-center mb-4 fw-bold text-primary">Danh sách phim</h2>
      <div
        id="movieCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="row">
          {currentMovies.map((item) => (
            <div className="col-md-3 mb-4" key={item.maPhim}>
              <div className="card h-100 position-relative border-0 shadow movie-card">
                <img
                  src={item.hinhAnh}
                  alt={item.tenPhim}
                  className="card-img-top img-fluid"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.tenPhim}</h5>
                  <p className="card-text text-muted">
                    Đánh giá: {item.danhGia}
                  </p>
                </div>
                <div className="movie-overlay d-flex justify-content-center align-items-center flex-column">
                  <button
                    className="btn btn-sm btn-danger mb-2"
                    onClick={() => window.open(item.trailer, "_blank")}
                  >
                    ▶ Trailer
                  </button>
                  <Link
                    to={`/detail/${item.maPhim}`}
                    className="btn btn-sm btn-info mb-2"
                  >
                    📄 Chi tiết
                  </Link>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleBookingClick(item.maPhim)}
                  >
                    🎟️ Đặt vé
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  ←
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  →
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
