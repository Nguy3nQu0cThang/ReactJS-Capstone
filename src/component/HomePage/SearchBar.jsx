import React, { useState } from 'react'

const SearchBar = () => {
  const [timPhim, setTimPhim] = useState("")
  
  const handleSearchMovie = () => {
    alert(`Tìm kiếm với từ khóa: ${timPhim}`)
  }
  return (
    <div>
      <input type="text" value={timPhim} onChange={(e) => setTimPhim(e.target.value)} placeholder='Tìm kiếm phim...' />
      <button onClick={handleSearchMovie}>Tìm phim</button>
    </div>
  )
}

export default SearchBar