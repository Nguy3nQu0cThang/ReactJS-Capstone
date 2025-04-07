import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [timPhim, setTimPhim] = useState("");
  const [arrMovie, setMovie] = useState([]);
  console.log(timPhim);
  const [search, setSearchParam] = useSearchParams();
  const valueKeyword = search.get("k");

  const handleSearchMovie = async () => {
    // alert(`Tìm kiếm với từ khóa: ${timPhim}`);
    if (valueKeyword) {
      const res = await axios.get(
        `https://movienew.cybersoft.edu.vn/api/QuanLyPhim?keyword=${valueKeyword}`
      );
      const data = await res.json();

      console.log(data.content);
      setMovie(data.content);
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
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="search"
          value={timPhim}
          onInput={(e) => setTimPhim(e.target.value)}
          placeholder="Tìm kiếm phim..."
        />
        <button type="submit">Tìm phim</button>
      </form>

      <h3>Kết quả tìm kiếm</h3>
      <div className="">
        {arrMovie.map((movie) => {
          return <div className="" key={movie.hinhAnh}></div>;
        })}
      </div>
    </div>
  );
};

export default SearchBar;
