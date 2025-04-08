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
    return <div>Loading...</div>
  } else if (query.error) {
    return <div>Lỗi {query.error.message}</div>
  }
  return (
    <div>

    </div>
  )
}

export default ListCinema