import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getListMovieOfCinemaAPI } from "../API/apiQuanLyRap";
import BookingMovieList from "../component/BookingPage/BookingMovieList";
import BookingCinemaList from "../component/BookingPage/BookingCinemaList";
import BookingScheduleList from "../component/BookingPage/BookingScheduleList";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const navigate = useNavigate();

  // Fetch toàn bộ lịch chiếu của các cụm rạp từ API
  const { data, isLoading, error } = useQuery({
    queryKey: ["ListMovieOfCinema"],
    queryFn: getListMovieOfCinemaAPI,
    staleTime: 1000 * 60,
  });

  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi khi tải dữ liệu: {error.message}</div>;
  if (!Array.isArray(data)) return <div>Không có dữ liệu rạp</div>;

  // Flatten toàn bộ cụm rạp từ các hệ thống
  const branches = data.flatMap((cinema) => cinema.lstCumRap || []);

  // Lấy danh sách tất cả phim duy nhất (lọc theo maPhim)
  const moviesMap = new Map();
  branches.forEach((branch) => {
    branch.danhSachPhim.forEach((phim) => {
      if (!moviesMap.has(phim.maPhim)) {
        moviesMap.set(phim.maPhim, phim);
      }
    });
  });

  const allMovies = Array.from(moviesMap.values());

  // Hàm hỗ trợ lọc
  const getMovieIdsByBranch = (branch) =>
    branch?.danhSachPhim.map((phim) => phim.maPhim) || [];

  const getBranchIdsByMovie = (movie) =>
    branches
      .filter((branch) =>
        branch.danhSachPhim.some((p) => p.maPhim === movie?.maPhim)
      )
      .map((b) => b.maCumRap);

  // Lọc danh sách phim
  const movieIdsOfSelectedBranch = selectedBranch
    ? getMovieIdsByBranch(selectedBranch)
    : [];

  const filteredMovies = allMovies.map((movie) => ({
    ...movie,
    isDimmed:
      selectedBranch && !movieIdsOfSelectedBranch.includes(movie.maPhim),
  }));

  // Lọc danh sách rạp
  const branchIdsOfSelectedMovie = selectedMovie
    ? getBranchIdsByMovie(selectedMovie)
    : [];

  const filteredBranches = branches.map((branch) => ({
    ...branch,
    isDimmed:
      selectedMovie && !branchIdsOfSelectedMovie.includes(branch.maCumRap),
  }));

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);

    // Nếu rạp hiện tại không còn chiếu phim này => reset rạp
    const isBranchValid = selectedBranch?.danhSachPhim.some(
      (phim) => phim.maPhim === movie.maPhim
    );
    if (!isBranchValid) {
      setSelectedBranch(null);
      setSelectedDate(null);
      setSelectedShowtime(null); // reset showtime nếu phim không còn trong rạp đã chọn
    }

    setSelectedDate(null);
    setSelectedShowtime(null);
  };

  const handleSelectBranch = (branch) => {
    setSelectedBranch(branch);

    // Nếu phim hiện tại không có trong rạp này => reset phim
    const isMovieValid =
      selectedMovie &&
      branch.danhSachPhim.some((phim) => phim.maPhim === selectedMovie.maPhim);
    if (!isMovieValid) {
      setSelectedMovie(null);
      setSelectedDate(null);
      setSelectedShowtime(null); // reset showtime nếu rạp không còn chiếu phim đã chọn
    }

    setSelectedDate(null);
    setSelectedShowtime(null);
  };

  const handleReset = () => {
    setSelectedMovie(null);
    setSelectedBranch(null);
    setSelectedDate(null);
    setSelectedShowtime(null);
  };

  const handleBooking = () => {
    if (selectedShowtime?.maLichChieu) {
      navigate(`/booking/${selectedShowtime.maLichChieu}`);
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Đặt vé xem phim</h2>

      {/* Debug state để theo dõi */}
      <div className="text-sm bg-gray-100 p-2 rounded mb-4">
        <div>🎬 Phim: {selectedMovie?.tenPhim || "Chưa chọn"}</div>
        <div>🏢 Rạp: {selectedBranch?.tenCumRap || "Chưa chọn"}</div>
        <div>
          📅 Ngày:{" "}
          {selectedDate
            ? new Intl.DateTimeFormat("vi-VN").format(selectedDate)
            : "Chưa chọn"}
        </div>
        <div>
          🕒 Suất:{" "}
          {selectedShowtime?.ngayChieuGioChieu
            ? selectedShowtime.ngayChieuGioChieu.slice(11, 16)
            : "Chưa chọn"}
        </div>
      </div>

      {/* Nút xác nhận đặt vé */}
      <div className="mt-6 text-center">
        <button
          onClick={handleReset}
          className={
            "px-6 py-2 rounded text-white bg-red-500 font-semibold cursor-pointer me-3"
          }
        >
          Đặt lại
        </button>
        <button
          onClick={handleBooking}
          disabled={!selectedShowtime}
          className={`px-6 py-2 rounded text-white font-semibold ${
            selectedShowtime ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Đặt vé
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-7">
        {/* Phim */}
        <BookingMovieList
          movies={filteredMovies}
          selectedMovie={selectedMovie}
          onSelectMovie={handleSelectMovie}
        />

        {/* Rạp */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Cụm rạp</h3>
          <BookingCinemaList
            branches={filteredBranches}
            selectedBranch={selectedBranch}
            selectedMovie={selectedMovie}
            onSelectBranch={handleSelectBranch}
          />
        </div>

        {/* Lịch chiếu */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Lịch chiếu</h3>
          <BookingScheduleList
            selectedMovie={selectedMovie}
            selectedBranch={selectedBranch}
            selectedShowtime={selectedShowtime}
            onSelectShowtime={(lich) => {
              setSelectedShowtime(lich);
              const dateObj = new Date(lich.ngayChieuGioChieu);
              setSelectedDate(dateObj);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
