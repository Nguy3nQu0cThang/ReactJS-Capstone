import React from "react";
import HeaderHome from "../component/HomePage/HeaderHome";
import Banner from "../component/HomePage/Banner";
import MovieList from "../component/HomePage/MovieList";

const HomePageMaster = () => {
  return (
    <div className="container mx-auto">
      <HeaderHome />
      <Banner />
      <MovieList />
    </div>
  );
};

export default HomePageMaster;
