import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TOKEN_CYBERSOFT } from "../../utils/setting";

const SearchBar = () => {
  const [timPhim, setTimPhim] = useState("");
  const [arrMovie, setArrMovie] = useState([]);
  console.log(timPhim);
  const [search, setSearchParam] = useSearchParams();
  const valueKeyword = search.get("k");

  const handleSearchMovie = async () => {
    // alert(`Tìm kiếm với từ khóa: ${timPhim}`);
    if (valueKeyword) {
      try {
        const res = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?tenPhim=${valueKeyword}`,
          {
            headers: {
              TokenCyberSoft: TOKEN_CYBERSOFT,
            },
          }
        );
        const data = res.data;

        console.log(data.content);
        setArrMovie(data.content);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm phim:", error);
      }
    }
  };
  useEffect(() => {
    handleSearchMovie();
  }, [valueKeyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParam({ k: timPhim });
  };
  return (
    <div style={{ padding: "2rem" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="search"
          value={timPhim}
          onInput={(e) => setTimPhim(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "300px",
            marginRight: "1rem",
            fontSize: "16px",
          }}
          placeholder="Tìm kiếm phim..."
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>Tìm phim</button>
      </form>

      <div className="">
        {arrMovie.length === 0 ? (
          <p>Không có phim nào.</p>
        ) : (
          arrMovie.map((movie) => (
            <div
              key={movie.maPhim}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            >
              <h3>{movie.tenPhim}</h3>
              <img
                src={movie.hinhAnh}
                alt={movie.tenPhim}
                style={{ width: "200px", height: "auto" }}
              />
              <p>{movie.moTa}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBar;
