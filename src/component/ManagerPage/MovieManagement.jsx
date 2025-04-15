import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMovieAPI, getMovieListAPI } from "../../API/apiQuanLyPhim";
import SearchBar from "../HomePage/SearchBar";
import { Link } from "react-router-dom";

const MovieManagement = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["MovieList"],
    queryFn: getMovieListAPI,
    staleTime: 1 * 60 * 1000,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMovieAPI,
    onSuccess: () => {
      alert("Đã xoá phim!");
      queryClient.invalidateQueries(["MovieList"]);
    },
    onError: () => {
      alert("Xoá phim thất bại.");
    },
  });

  const handleDelete = (maPhim) => {
    if (window.confirm("Bạn có chắc muốn xoá phim này không?")) {
      deleteMutation.mutate(maPhim);
    }
  };

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
                    to={`/admin/edit/${movie.maPhim}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(movie.maPhim)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
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
