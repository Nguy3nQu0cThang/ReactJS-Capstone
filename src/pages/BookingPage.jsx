import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { bookingAPI } from "../API/apiBooking";
import SeatList from "../component/BookingPage/SeatList";
import BookingInfo from "../component/BookingPage/MovieInfo";
import TotalCheckout from "../component/BookingPage/TotalCheckout";

const BookingPage = () => {
  const { maLichChieu } = useParams();
  const [selectSeats, setSelectSeats] = useState([]);

  const query = useQuery({
    queryKey: ["danhSachGhe", maLichChieu],
    queryFn: () => bookingAPI(maLichChieu),
    staleTime: 1 * 1000 * 60,
    gcTime: 1000 * 10,
    enabled: !!maLichChieu,
  });

  if (query.isLoading) {
    console.log(query);
    return <div>Loading...</div>;
  } else if (query.error) {
    return <div>Lỗi {query.error.message}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="col-span-2">
        <SeatList
          seats={query.data.danhSachGhe}
          selectSeats={selectSeats}
          setSelectSeats={setSelectSeats}
        />
      </div>
      <div className="col-span-1 space-y-4">
        <BookingInfo info={query.data.thongTinPhim} />
        <TotalCheckout
          selectSeats={selectSeats}
          setSelectSeats={setSelectSeats}
          maLichChieu={maLichChieu}
          refetch={query.refetch}
        />
      </div>
    </div>
  );
};

export default BookingPage;
