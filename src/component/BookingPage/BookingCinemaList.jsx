import React from "react";

const BookingCinemaList = ({
  branches,
  selectedBranch,
  onSelectBranch,
  selectedMovie,
}) => {
  return (
    <div className="space-y-2 max-h-[500px] overflow-y-auto">
      {branches.map((branch) => {
        // Kiểm tra nếu đã chọn phim thì rạp này có chiếu phim đó không?
        const isDimmed =
          selectedMovie &&
          !branch.danhSachPhim.some(
            (phim) => phim.maPhim === selectedMovie.maPhim
          );

        return (
          <div
            key={branch.maCumRap}
            onClick={() => {
              if (!isDimmed) onSelectBranch(branch);
            }}
            className={`
              cursor-pointer p-2 rounded border 
              ${
                isDimmed
                  ? "opacity-30 pointer-events-none"
                  : "hover:bg-green-100"
              } 
              ${
                selectedBranch?.maCumRap === branch.maCumRap
                  ? "bg-green-200"
                  : ""
              }
            `}
          >
            🏢 {branch.tenCumRap}
          </div>
        );
      })}
    </div>
  );
};

export default BookingCinemaList;
