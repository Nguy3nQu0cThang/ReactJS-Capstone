import React from "react";

const BookingMovieList = ({ movies, selectedMovie, onSelectMovie }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Danh sách phim</h3>
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {movies.map((movie) => (
          <div
            key={movie.maPhim}
            onClick={() => {
              if (!movie.isDimmed) onSelectMovie(movie);
            }}
            className={`
              cursor-pointer p-2 rounded border 
              ${
                movie.isDimmed
                  ? "opacity-30 pointer-events-none"
                  : "hover:bg-blue-100"
              } 
              ${selectedMovie?.maPhim === movie.maPhim ? "bg-blue-200" : ""}
            `}
          >
            🎬 {movie.tenPhim}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingMovieList;
