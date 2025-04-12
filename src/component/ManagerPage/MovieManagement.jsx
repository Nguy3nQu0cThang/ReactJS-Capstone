import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieListAPI } from "../../API/apiQuanLyPhim";
import SearchBar from "../HomePage/SearchBar";
import { Link } from "react-router-dom";

const MovieManagement = () => {
  const query = useQuery({
    queryKey: ["MovieList"],
    queryFn: getMovieListAPI,
    staleTime: 1 * 60 * 1000,
  });

  if (query.isLoading) return <div>Loading...</div>;
  if (query.error) return <div>Lỗi: {query.error.message}</div>;
  return (
    <div className="container mx-auto py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý phim</h2>
        <Link to="/admin/add" className="btn btn-success">
          + Add Movie
        </Link>
      </div>
      <SearchBar />
      <div className="table-responsive mt-4">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Poster</th>
              <th>Tên phim</th>
              <th>Mô tả</th>
              <th>Đánh giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {query.data.map((movie) => (
              <tr key={movie.maPhim}>
                <td>
                  <img
                    src={movie.hinhAnh}
                    alt={movie.tenPhim}
                    width="80"
                    height="100"
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>{movie.tenPhim}</td>
                <td className="text-truncate" style={{ maxWidth: "300px" }}>
                  {movie.moTa}
                </td>
                <td>{movie.danhGia}</td>
                <td>
                  <Link
                    to={`/admin/movies/edit/${movie.maPhim}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>
                  {/* You could add delete button here too */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieManagement;
