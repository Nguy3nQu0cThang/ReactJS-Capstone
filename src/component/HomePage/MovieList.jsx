import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieListAPI } from "../../API/apiQuanLyPhim";
import { Card } from "antd";
const MovieList = () => {
  // const movies = ['Phim 1', 'Phim 2', 'Phim 3']
  const query = useQuery({
    queryKey: [`MovieList`],
    queryFn: getMovieListAPI,
    staleTime: 1 * 1000 * 60,
    cacheTime: 1000 * 10,
  });
  if (query.isLoading) {
    return <div>Loading....</div>;
  } else if (query.error) {
    return <div>Lỗi {query.error.message}</div>;
  }
  return (
    <div className="container mx-auto">
      <h3 className="text-center">Movie list</h3>
      <div className="grid grid-cols-4 gap-5">
        {query.data.map((item, index) => {
          return (
            <Card
              key={index}
              hoverable
              style={{ width: 200 }}
              cover={<img alt="..." src={item.hinhAnh} />}
            >
              <h3>{item.tenPhim}</h3>
              <p>{item.danhGia}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
