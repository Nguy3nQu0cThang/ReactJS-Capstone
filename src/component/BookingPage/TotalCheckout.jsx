import React from 'react'
import { bookingTicketAPI } from '../../API/apiBooking';

const TotalCheckout = ({ selectSeats, setSelectSeats, maLichChieu, refetch }) => {
  // Tính tổng tiền
  const total = selectSeats.reduce((sum, seat) => sum + seat.giaVe, 0);

  // Hàm xử lý đặt vé
  const handleBooking = async () => {
    if (selectSeats.length === 0) {
      alert("Bạn chưa chọn ghế nào!");
      return;
    }

    const danhSachVe = selectSeats.map((seat) => ({
      maGhe: seat.maGhe,
      giaVe: seat.giaVe,
    }));

    const payload = {
      maLichChieu,
      danhSachVe,
    };

    try {
      await bookingTicketAPI(payload);
      alert("🎉 Đặt vé thành công!");
      setSelectSeats([]);
      await refetch();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("❌ Đặt vé thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-center">Thông tin đặt vé</h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Số ghế đã chọn:</span>
          <span className="font-bold text-green-600">{selectSeats.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Tổng tiền:</span>
          <span className="font-bold text-red-600">
            {total.toLocaleString()} VND
          </span>
        </div>
      </div>

      <button
        onClick={handleBooking}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
      >
        Đặt vé
      </button>
    </div>
  );
};

export default TotalCheckout