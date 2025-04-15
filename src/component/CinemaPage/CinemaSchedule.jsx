import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getListMovieOfCinemaAPI } from "../../API/apiQuanLyRap";
import { useNavigate } from "react-router-dom";

const CinemaSchedule = ({ maCumRap }) => {
  const navigate = useNavigate();

  const goToMovieDetail = (maPhim) => {
    navigate(`/detail/${maPhim}`);
  };

  const [selectedDates, setSelectedDates] = useState({});

  const query = useQuery({
    queryKey: ["ListMovieOfCinema", maCumRap], 
    queryFn: () => getListMovieOfCinemaAPI(),
    staleTime: 1 * 1000 * 60,
    gcTime: 1000 * 10,
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  } else if (query.error) {
    return <div>Lỗi {query.error.message}</div>;
  }

  if (!Array.isArray(query.data)) {
    return <div>Không có dữ liệu rạp</div>;
  }

  // Tìm cụm rạp được chọn
  const selectedBranch = query.data
    .flatMap((cinema) => cinema.lstCumRap || [])
    .find((branch) => branch.maCumRap === maCumRap);

   if (!selectedBranch || !selectedBranch.danhSachPhim?.length) {
     return <div>Không có phim cho cụm rạp này.</div>;
   }

  return (
    <div className="h-full overflow-y-auto pr-4">
      <h3 className="text-xl font-bold mb-4">{selectedBranch.tenCumRap}</h3>

      {selectedBranch.danhSachPhim.map((phim) => {
        const uniqueDates = [
          ...new Set(
            phim.lstLichChieuTheoPhim.map((lich) =>
              new Date(lich.ngayChieuGioChieu).toLocaleDateString()
            )
          ),
        ];

        const selectedDate =
          selectedDates[phim.maPhim] || uniqueDates[0] || null;

        const handleDateSelect = (date) => {
          setSelectedDates((prev) => ({
            ...prev,
            [phim.maPhim]: date,
          }));
        };

        const showtimes = phim.lstLichChieuTheoPhim.filter(
          (lich) =>
            new Date(lich.ngayChieuGioChieu).toLocaleDateString() ===
            selectedDate
        );

        return (
          <div key={phim.maPhim} className="mb-6 flex gap-4">
            {/* Hình ảnh phim */}
            <div>
              <img
                src={phim.hinhAnh}
                alt={phim.tenPhim}
                className="w-28 h-40 object-cover rounded cursor-pointer"
                onClick={() => goToMovieDetail(phim.maPhim)}
              />
            </div>

            {/* Thông tin phim */}
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {phim.hot && (
                  <span className="bg-red-600 text-white text-lg font-bold px-2 py-1 rounded-lg">
                    HOT
                  </span>
                )}
                <h4
                  className="text-lg font-semibold cursor-pointer"
                  onClick={() => goToMovieDetail(phim.maPhim)}
                >
                  {phim.tenPhim}
                </h4>
                {(phim.dangChieu || phim.sapChieu) && (
                  <span className="bg-black bg-opacity-50 text-white text-sm px-2 py-0.5 rounded italic">
                    {phim.dangChieu ? "Đang chiếu" : "Sắp chiếu"}
                  </span>
                )}
              </div>

              {/* Chọn ngày chiếu */}
              <div className="flex flex-wrap gap-2 mt-2">
                {uniqueDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => handleDateSelect(date)}
                    className={`px-3 py-1 text-xs rounded border ${
                      selectedDate === date
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>

              {/* Hiển thị suất chiếu */}
              <div className="flex flex-wrap gap-2 mt-2">
                {showtimes.map((lich, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-lg bg-blue-100 text-blue-700 rounded cursor-pointer"
                    onClick={() => navigate(`/booking/${lich.maLichChieu}`)}
                  >
                    {new Date(lich.ngayChieuGioChieu).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    - {lich.tenRap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CinemaSchedule;
