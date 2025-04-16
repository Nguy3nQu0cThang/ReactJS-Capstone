// src/component/BookingPage/BookingScheduleList.jsx
import React, { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";

const BookingScheduleList = ({
  selectedMovie,
  selectedBranch,
  selectedShowtime,
  onSelectShowtime,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // ✅ Tìm phim đang chọn trong cụm rạp
  const movieInBranch = useMemo(() => {
    if (!selectedMovie || !selectedBranch) return null;
    return selectedBranch.danhSachPhim.find(
      (phim) => phim.maPhim === selectedMovie.maPhim
    );
  }, [selectedMovie, selectedBranch]);

  // ✅ Gom lịch chiếu theo ngày
  const showtimesByDate = useMemo(() => {
    if (!movieInBranch) return {};
    return movieInBranch.lstLichChieuTheoPhim.reduce((acc, lich) => {
      const date = dayjs(lich.ngayChieuGioChieu).format("YYYY-MM-DD");
      if (!acc[date]) acc[date] = [];
      acc[date].push(lich);
      return acc;
    }, {});
  }, [movieInBranch]);

  const dates = Object.keys(showtimesByDate);

  // ✅ Khi thay đổi phim hoặc cụm rạp → chọn lại ngày đầu tiên (nếu có)
  useEffect(() => {
    if (dates.length > 0) {
      // Nếu ngày cũ không còn hợp lệ thì set ngày đầu tiên
      if (!dates.includes(selectedDate)) {
        setSelectedDate(dates[0]);
      }
    } else {
      setSelectedDate(null);
    }
  }, [selectedMovie, selectedBranch, dates]);

  // 🟡 Trường hợp chưa chọn phim hoặc cụm rạp
  if (!selectedMovie || !selectedBranch) {
    return (
      <div className="text-gray-500 italic">Vui lòng chọn phim và cụm rạp</div>
    );
  }

  // 🟡 Phim không có lịch chiếu ở cụm rạp này
  if (!movieInBranch) {
    return (
      <div className="text-gray-500 italic">
        Phim không có suất chiếu ở cụm rạp này
      </div>
    );
  }

  return (
    <div className="h-[500px] overflow-y-auto">
      <h3 className="font-semibold mb-2">Lịch chiếu</h3>

      {/* Danh sách ngày chiếu */}
      <div className="flex gap-2 flex-wrap mb-4">
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`px-3 py-1 rounded border transition ${
              selectedDate === date
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {dayjs(date).format("DD/MM/YYYY")}
          </button>
        ))}
      </div>

      {/* Danh sách suất chiếu */}
      {selectedDate && (
        <div className="flex gap-2 flex-wrap">
          {showtimesByDate[selectedDate]?.map((showtime) => (
            <button
              key={showtime.maLichChieu}
              onClick={() => onSelectShowtime(showtime)}
              className={`px-3 py-1 rounded border transition ${
                selectedShowtime?.maLichChieu === showtime.maLichChieu
                  ? "bg-green-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {dayjs(showtime.ngayChieuGioChieu).format("HH:mm")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingScheduleList;
