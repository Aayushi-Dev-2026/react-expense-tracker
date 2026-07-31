'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import MovieDetailsModal from '@/components/MovieDetailsModal';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Batman');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query) => {
    setLoading(true);
    const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'f88aeb0f';
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie`);
      if (!res.ok) {
        setMovies([]);
        setLoading(false);
        return;
      }
      
      const text = await res.text();
      if (!text) {
        setMovies([]);
        setLoading(false);
        return;
      }

      const data = JSON.parse(text);
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
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
    <div style={{ minHeight: '100vh', backgroundColor: '#141414' }}>
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleSearch={handleSearch} 
      />
      <main style={{ padding: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>
          {searchTerm ? `Search Results for "${searchTerm}"` : 'Popular Movies'}
        </h1>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#aaa', fontSize: '18px' }}>
            Loading movies...
          </div>
        ) : movies.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {movies.map((movie) => (
              <MovieCard 
                key={movie.imdbID} 
                movie={movie} 
                onSelectMovie={(id) => setSelectedMovieId(id)} 
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#aaa' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎬</div>
            <h2 style={{ color: '#fff', fontSize: '22px', marginBottom: '8px' }}>No Movies Found</h2>
            <p style={{ fontSize: '14px', color: '#777' }}>
              We couldn't find anything matching "{searchTerm}". Try searching for another movie title!
            </p>
          </div>
        )}
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