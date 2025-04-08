import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieListAPI } from "../../API/apiQuanLyPhim";
import SearchBar from "./SearchBar";
// import { Card } from "antd";
const MovieList = () => {
  // const movies = ['Phim 1', 'Phim 2', 'Phim 3']
  const query = useQuery({
    queryKey: [`MovieList`],
    queryFn: getMovieListAPI,
    staleTime: 1 * 1000 * 60,
    gcTime: 1000 * 10,
  });
  if (query.isLoading) {
    return <div>Loading....</div>;
  } else if (query.error) {
    return <div>Lỗi {query.error.message}</div>;
  }
  return (
    // <div className="container mx-auto">
    //   <h3 className="text-center">Movie list</h3>
    //   <div className="grid grid-cols-4 gap-5">
    //     {query.data.map((item, index) => {
    //       return (
    //         <Card
    //           key={index}
    //           hoverable
    //           style={{ width: 200 }}
    //           cover={<img alt="..." src={item.hinhAnh} />}
    //         >
    //           <h3>{item.tenPhim}</h3>
    //           <p>{item.danhGia}</p>
    //         </Card>
    //       );
    //     })}
    //   </div>
    // </div>

    <div className="container py-4">
      <SearchBar />

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {query.data.map((item, index) => {
          return (
            <div className="col" key={index}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={item.hinhAnh}
                  alt={item.tenPhim}
                  className="card-img-top img-fluid"
                  style={{ height: "300px", objectFit: "fill" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.tenPhim}</h5>
                  <p className="card-text text-muted">
                    Đánh giá: {item.danhGia}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;