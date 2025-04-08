import React from 'react'
import { Outlet } from 'react-router-dom';
import SearchBar from '../component/HomePage/SearchBar';

const DetailPage = () => {
  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Trang phim</h2>
      <Outlet />
    </div>
  );
}

export default DetailPage