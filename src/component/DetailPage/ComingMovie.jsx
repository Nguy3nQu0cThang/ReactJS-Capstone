import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieListAPI } from "../../API/apiQuanLyPhim";

const ComingMovie = () => {
  const [invisibleCount, setInvisibleCount] = useState(8);
  const query = useQuery({
    queryKey: [`MovieList`],
    queryFn: getMovieListAPI,
    staleTime: 1 * 1000 * 60,
    gcTime: 1000 * 10,
  });

  if (query.isLoading) {
    return <div>Loading....</div>;
  } else if (query.error) {
    return <div>Lỗi {query.error.message}</div>;
  }

  // Lọc các phim sắp chiếu 
  const comingMovies = query.data.filter((item) => item.sapChieu === true);

  // Chỉ lấy số lượng phim theo invisibleCount
  const visibleMovies = comingMovies.slice(0, invisibleCount);

  // Hàm để tăng số lượng phim hiển thị
  const loadMoreMovies = () => {
    setInvisibleCount((prevCount) => prevCount + 8);
  };

  return (
    <div className="container pt-5 mb-5">
      <h2 className="text-center mb-4 fw-bold text-primary">
        Danh sách phim sắp chiếu
      </h2>
      <div>
        {visibleMovies
          .reduce((acc, curr, index) => {
            if (index % 4 === 0) acc.push([]); // Mỗi slide chứa 4 phim
            acc[acc.length - 1].push(curr);
            return acc;
          }, [])
          .map((group, groupIndex) => (
            <div
              className={`${groupIndex === 0 ? "active" : ""}`}
              key={groupIndex}
            >
              <div className="row mb-3">
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
                        <p className="card-text text-muted h-[100px] overflow-y-auto">
                          <strong>Mô tả:</strong> {item.moTa}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Nút Xem thêm */}
      {invisibleCount < comingMovies.length && (
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={loadMoreMovies}>
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default ComingMovie;
