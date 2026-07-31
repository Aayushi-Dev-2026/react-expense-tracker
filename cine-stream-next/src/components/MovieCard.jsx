'use client';
import React from 'react';

const MovieCard = ({ movie, onSelectMovie }) => {
  const posterUrl = movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  const handleClick = () => {
    if (typeof onSelectMovie === 'function') {
      onSelectMovie(movie.imdbID);
    }
  };

  return (
    <div 
      onClick={handleClick}
      style={{ 
        cursor: 'pointer', 
        borderRadius: '8px', 
        overflow: 'hidden', 
        backgroundColor: '#1f1f1f',
        color: '#fff'
      }}
    >
      <img
        src={posterUrl}
        alt={movie.Title}
        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
        }}
      />
      <div style={{ padding: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{movie.Title}</h3>
        <p style={{ fontSize: '12px', color: '#aaa', margin: 0 }}>{movie.Year} • {movie.Type?.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default MovieCard;