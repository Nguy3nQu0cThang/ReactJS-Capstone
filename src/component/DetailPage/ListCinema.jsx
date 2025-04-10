import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getListCinemaAPI } from "../../API/apiQuanLyRap";

const ListCinema = ({ onSelectCinema }) => {
  const query = useQuery({
    queryKey: ["ListCinema"],
    queryFn: getListCinemaAPI,
    staleTime: 60 * 1000,
    gcTime: 10 * 1000,
  });

  if (query.isLoading) {
    console.log(query);
    return <div>Loading...</div>;
  } else if (query.error) {
    return <div>Lỗi {query.error.message}</div>;
  }
  return (
    <div className="h-full overflow-y-auto border-r border-gray-200 ">
      {query.data.map((cinema) => (
        <button
          key={cinema.maHeThongRap}
          className="w-full px-4 py-4 hover:bg-gray-100 border-b text-left"
          onClick={() => onSelectCinema(cinema.maHeThongRap)}
        >
          <img
            src={cinema.logo}
            alt={cinema.tenHeThongRap}
            className="h-12 object-contain mx-auto"
          />
        </button>
      ))}
    </div>
  );
};

export default ListCinema;