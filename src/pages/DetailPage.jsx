import React, { useState } from "react";
import CurrentMovie from "../component/DetailPage/CurrentMovie";
import ComingMovie from "../component/DetailPage/ComingMovie";
import MovieList from "../component/HomePage/MovieList";

const DetailPage = () => {
  const [selectedTab, setSelectedTab] = useState("current");

  return (
    <div className="mt-5">
      <MovieList />
      <div className="flex gap-4 mb-4 justify-center">
        <button
          className={`px-4 py-2 border rounded ${
            selectedTab === "current" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("current")}
        >
          Đang chiếu
        </button>
        <button
          className={`px-4 py-2 border rounded ${
            selectedTab === "coming" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("coming")}
        >
          Sắp chiếu
        </button>
      </div>
      {selectedTab === "current" && <CurrentMovie />}
      {selectedTab === "coming" && <ComingMovie />}
    </div>
  );
};

export default DetailPage;

