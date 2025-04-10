import React from 'react'

const BookingInfo = ({ info }) => {
  return (
    <div className="p-4 border rounded shadow-md">
      <img src={info.hinhAnh} alt={info.tenPhim} className="w-full mb-4" />
      <h2 className="text-xl font-bold">{info.tenPhim}</h2>
      <p>
        <strong>Rạp:</strong> {info.tenCumRap} - {info.tenRap}
      </p>
      <p>
        <strong>Địa chỉ:</strong> {info.diaChi}
      </p>
      <p>
        <strong>Suất chiếu:</strong> {info.ngayChieu} - {info.gioChieu}
      </p>
    </div>
  );
};

export default BookingInfo