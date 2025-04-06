import React from 'react'

const MovieList = () => {
  const movies = ['Phim 1', 'Phim 2', 'Phim 3']

  return (
    <div>
      <h2>Danh sách phim</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  )
}

export default MovieList