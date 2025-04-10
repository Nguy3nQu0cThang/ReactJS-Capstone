import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieListAPI } from "../../API/apiQuanLyPhim";
import { Link } from "react-router-dom";
// import { Card } from "antd";
const MovieList = () => {
  // const movies = ['Phim 1', 'Phim 2', 'Phim 3']
  const query = useQuery({
    queryKey: [`MovieList`],
    queryFn: getMovieListAPI,
    staleTime: 1 * 1000 * 60,
    cacheTime: 1000 * 10,
  });
  if (query.isLoading) {
    return <div>Loading....</div>;
  } else if (query.error) {
    return <div>Lỗi {query.error.message}</div>;
  }
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
        <div className="carousel-inner">
          {query.data
            .reduce((acc, curr, index) => {
              if (index % 4 === 0) acc.push([]);
              acc[acc.length - 1].push(curr);
              return acc;
            }, [])
            .map((group, groupIndex) => (
              <div
                className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}
                key={groupIndex}
              >
                <div className="row">
                  {group.map((item, index) => (
                    <div className="col-md-3" key={index}>
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

                        {/* Hover buttons */}
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
                          <Link
                            to={`...`}
                            className="btn btn-sm btn-success"
                          >
                            🎟️ Đặt vé
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev carousel-control-custom position-absolute start-0"
          type="button"
          data-bs-target="#movieCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next carousel-control-custom position-absolute end-0"
          type="button"
          data-bs-target="#movieCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </div>
  );
};

export default MovieList;