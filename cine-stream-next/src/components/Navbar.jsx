'use client';
import React from 'react';

const Navbar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: '#141414', borderBottom: '1px solid #333' }}>
      <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff' }}>
        <span style={{ color: '#E50914' }}>CINE</span>STREAM
      </div>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#222', color: '#fff', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', backgroundColor: '#E50914', color: '#fff', cursor: 'pointer' }}>
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;