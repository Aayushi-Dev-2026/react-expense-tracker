'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import MovieDetailsModal from '@/components/MovieDetailsModal';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Batman');
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const fetchMovies = async (query) => {
    const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'f88aeb0f';
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie`);
      if (!res.ok) return;
      
      const text = await res.text();
      if (!text) return;

      const data = JSON.parse(text);
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies('Batman');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchMovies(searchTerm);
    }
  };

  return (
    <div>
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleSearch={handleSearch} 
      />
      <main style={{ padding: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>
          Popular Movies
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {movies.map((movie) => (
            <MovieCard 
              key={movie.imdbID} 
              movie={movie} 
              onSelectMovie={(id) => setSelectedMovieId(id)} 
            />
          ))}
        </div>
      </main>

      {selectedMovieId && (
        <MovieDetailsModal 
          selectedMovie={selectedMovieId} 
          setSelectedMovie={setSelectedMovieId} 
        />
      )}
    </div>
  );
}