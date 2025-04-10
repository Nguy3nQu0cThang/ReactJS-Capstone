import React from "react";
import HeaderHome from "../component/HomePage/HeaderHome";
import Banner from "../component/HomePage/Banner";
import MovieList from "../component/HomePage/MovieList";
import ListCinema from "../component/HomePage/ListCinema";
import ScheduleMovie from "../component/HomePage/ScheduleMovie";
const HomePageMaster = () => {
  return (
    <div className="container mx-auto">
      <HeaderHome />
      <Banner />
      <MovieList />
      <div className="flex gap-4 ">
        <div className="w-[15%]">
          <ListCinema />
        </div>
        <div className="w-[85%]">
          <ScheduleMovie />
        </div>
      </div>
    </div>
  );
};

export default HomePageMaster;