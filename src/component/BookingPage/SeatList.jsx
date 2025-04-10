import React from 'react'

const SeatList = ({ seats, selectSeats, setSelectSeats }) => {
  const handleSelect = (seat) => {
    if (seat.daDat) return

    const isSelected = selectSeats.find((s) => s.maGhe === seat.maGhe)
    if (isSelected) {
      setSelectSeats(selectSeats.filter((s) => s.maGhe !== seat.maGhe))
    } else {
      setSelectSeats([...selectSeats, seat])
    }
  }
  return (
    <div className="grid grid-cols-10 gap-2">
      {seats.map((seat) => {
        // Xác định class màu ghế
        let seatClass = "w-10 h-10 rounded text-white";

        if (seat.daDat) {
          seatClass += " bg-gray-400 cursor-not-allowed";
        } else {
          const isSelected = selectSeats.find((s) => s.maGhe === seat.maGhe);
          seatClass += isSelected ? " bg-green-500" : " bg-blue-500";
        }

        return (
          <button
            key={seat.maGhe}
            className={seatClass}
            disabled={seat.daDat}
            onClick={() => handleSelect(seat)}
          >
            {seat.tenGhe}
          </button>
        );
      })}
      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-6 h-4 bg-blue-500 rounded"></div>
          <span>Chưa chọn</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-4 bg-green-500 rounded"></div>
          <span>Đã chọn</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-4 bg-gray-400 rounded"></div>
          <span>Đã đặt</span>
        </div>
      </div>
    </div>
  );
};

export default SeatList