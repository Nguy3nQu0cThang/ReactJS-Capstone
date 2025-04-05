import React from "react";
import HeaderHome from "../component/HomePage/HeaderHome";
import Banner from "../component/HomePage/Banner";
import SearchBar from "../component/HomePage/SearchBar";
import MovieList from "../component/HomePage/MovieList";
const HomePageMaster = () => {
  return (
    <div>
      <HeaderHome />
      <Banner />
      <SearchBar />
      <MovieList />
    </div>
  );
};

export default HomePageMaster;
