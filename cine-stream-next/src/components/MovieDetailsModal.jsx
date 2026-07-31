'use client';
import React, { useEffect, useState } from 'react';

const MovieDetailsModal = ({ selectedMovie, setSelectedMovie }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!selectedMovie) return;
    const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'f88aeb0f';
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedMovie}&plot=full`)
      .then((res) => res.json())
      .then((data) => setDetails(data))
      .catch((err) => console.error(err));
  }, [selectedMovie]);

  if (!selectedMovie) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: '#181818', color: '#fff', padding: '24px', borderRadius: '8px', maxWidth: '500px', width: '90%', relative: 'relative' }}>
        {details ? (
          <>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>{details.Title} ({details.Year})</h2>
            <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '10px' }}>{details.Genre} • {details.Runtime} • Rating: {details.imdbRating}</p>
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{details.Plot}</p>
            <button onClick={() => setSelectedMovie(null)} style={{ marginTop: '20px', padding: '8px 16px', border: 'none', backgroundColor: '#E50914', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>
              Close
            </button>
          </>
        ) : (
          <p>Loading details...</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsModal;