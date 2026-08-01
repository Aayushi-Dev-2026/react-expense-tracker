# 📝 AI Prompts & Engineering Log — CineStream (Next.js Edition)

> **Sprint 9 Assignment** | **Track : Frontend Specialist**  
> *Documentation of AI collaboration, architecture prompts, and implementation steps for migrating a React SPA to Next.js App Router.*

---

## 📍 Phase 1: Next.js App Router Setup & Component Porting

### ❓ User Prompt 1

> *"I want to migrate my client-side React SPA (`cine-stream-app`) to Next.js 14 App Router. How should I organize the directory structure under `src/app` and move my existing components (`Navbar`, `MovieCard`, `MovieDetailsModal`)?"*

### 🤖 AI Response & Guidance

To migrate from React SPA to Next.js App Router, structure your files under the `src/` directory. Next.js uses server components by default, so interactive components handling React hooks (`useState`, `useEffect`) must explicitly declare `'use client'` at the top.

#### Key Architectural Concept:

* **Server Components (RSC):** Default in App Router; optimal for static layout and SEO.
* **Client Boundaries (`'use client'`):** Required for components managing state or event listeners.

```javascript
// src/components/Navbar.jsx
'use client';
import React from 'react';

const Navbar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  // Client component logic for handling user search input
  return (
    <nav className="navbar">
      {/* Search form JSX */}
    </nav>
  );
};

export default Navbar;
```

---

## 📍 Phase 2: OMDb API Integration & Dynamic Data Fetching

### ❓ User Prompt 2

"How do I configure environment variables for the OMDb API in Next.js and fetch movie results dynamically without hardcoding API keys?"

### 🤖 AI Response & Guidance

In Next.js, public client-side environment variables must be prefixed with NEXT_PUBLIC_. Store your key in .env.local and access it via process.env.NEXT_PUBLIC_OMDB_API_KEY.

**Implementation Snippet:**

```javaScript

// src/app/page.js
const fetchMovies = async (query) => {
  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'f88aeb0f';
  try {
    const res = await fetch(`[https://www.omdbapi.com/?apikey=$](https://www.omdbapi.com/?apikey=$){API_KEY}&s=${query}&type=movie`);
    const data = await res.json();
    setMovies(data.Search || []);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};
```

---

## 📍 Phase 3: Search Interactivity, Modal Overlays & Fallback UI

### ❓ User Prompt 3

"How can I handle movie search state, show movie details in a popup modal when clicked, and display a 'No Movies Found' fallback UI when search results are empty?"

### 🤖 AI Response & Guidance

Lift state to src/app/page.js to manage searchTerm, movies, loading, and selectedMovieId. Use conditional rendering to handle loading, empty result states, and modal overlays cleanly.

**Implementation Logic Snippet:**

```javaScript

// Conditional Rendering for Empty Search State
{loading ? (
  <div className="loader">Loading movies...</div>
) : movies.length > 0 ? (
  <div className="movie-grid">
    {movies.map((movie) => (
      <MovieCard key="{movie.imdbID}" movie="{movie}" onSelectMovie="{setSelectedMovieId}"/>
    ))}
  </div>
) : (
  <div className="empty-state">
    <h2>No Movies Found</h2>
    <p>We couldn't find anything matching "{searchTerm}". Try searching for another movie title!</p>
  </div>
)}
```

---

## 🎯 Key Takeaways & Best Practices
**Explicit Client Boundaries:** Adding 'use client' only where interactivity is required preserves server-side performance.

**Resilient API Handling:** Safe parsing (JSON.parse) and empty state fallbacks prevent app crashes from bad API payloads.

**Environment Security:** Keeping API keys inside .env.local ensures clean codebase practices.

---
