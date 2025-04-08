import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getListCinemaAPI } from '../../API/apiQuanLyRap'

const ListCinema = () => {
  const query = useQuery({
    queryKey: [`ListCinema`],
    queryFn: getListCinemaAPI,
    staleTime: 1 * 1000 * 60,
    gcTime: 1000 * 10
  })
  
  if (query.isLoading) {
    console.log(query);
    return <div>Loading...</div>
  } else if (query.error) {
    return <div>Lỗi {query.error.message}</div>
  }
  return (
    <div>
      <div className="container py-4">
        <h3 className="text-xl font-semibold mb-4">Danh sách hệ thống rạp</h3>
        <ul className="list-disc pl-6 space-y-2">
          {query.data.map((value, index) => (
            <li key={index}>
              <strong>{value.tenHeThongRap}</strong>
              <img
                src={value.logo}
                alt={value.tenHeThongRap}
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListCinema