import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getListMovieOfCinemaAPI } from '../../API/apiQuanLyRap'


const CinemaBranches = ({ maHeThongRap, onSelectBranch }) => {
  const [selectBranch, setSelectBranch] = useState(null);
  const query = useQuery({
    queryKey: ["ListMovieOfCinema", maHeThongRap ],
    queryFn: () => getListMovieOfCinemaAPI(),
    staleTime: 1000 * 60,
    gcTime: 1000 * 10,
  });

  useEffect(() => {
    if (Array.isArray(query.data)) {
      const cinema = query.data.find(
        (cinema) => cinema.maHeThongRap === maHeThongRap
      );
      const firstBranch = cinema?.lstCumRap?.[0];

      if (firstBranch) {
        setSelectBranch(firstBranch.maCumRap);
        onSelectBranch(firstBranch.maCumRap);
      }
    }
  }, [maHeThongRap, query.data, onSelectBranch]);

  if (query.isLoading) {
    console.log(query);
    return <div>Loading...</div>;
  } else if (query.error) {
    return <div>Lỗi {query.error.message}</div>;
  }

  const selectedCinema = Array.isArray(query.data)
    ? query.data.find((cinema) => cinema.maHeThongRap === maHeThongRap)
    : null;

  if (!selectedCinema) return <div>Không tìm thấy hệ thống rạp</div>;

  return (
    <div className="h-full overflow-y-auto border-r border-gray-200">
      {selectedCinema.lstCumRap.map((branch) => (
        <div
          key={branch.maCumRap}
          onClick={() => {
            onSelectBranch(branch.maCumRap);
            setSelectBranch(branch.maCumRap);
          }}
          className={`cursor-pointer p-2 mb-2 rounded border ${
            selectBranch === branch.maCumRap
              ? "bg-blue-100 border-blue-500"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          <h4 className="font-semibold">{branch.tenCumRap}</h4>
          <p className="text-sm text-gray-600">{branch.diaChi}</p>
        </div>
      ))}
    </div>
  );
};

export default CinemaBranches