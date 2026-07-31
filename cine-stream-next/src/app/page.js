import MovieCard from '@/components/MovieCard';

async function getMovies() {
  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'f88aeb0f';
  
  // Valid search query 'Batman' se movies fetch kar rahe hain
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=Batman&type=movie`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.Search || [];
}

export default async function HomePage() {
  const movies = await getMovies();

  return (
    <main style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>
        Popular Movies
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </main>
  );
}