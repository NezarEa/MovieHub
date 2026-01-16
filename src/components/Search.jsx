import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchFilms } from '../store/filmsSlice';
import { Link } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector((state) => state.films);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchFilms(query));
    }
  };

  return (
    <div className="page-content">
      <h1>Search Films</h1>
      <div className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter film title..."
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      {loading && <div className="loading">Searching films...</div>}
      {error && <div className="error">Error: {error}</div>}
      {!loading && !error && searchResults.length === 0 && query.trim() && (
        <div className="error">No results found for "{query}"</div>
      )}
      
      <div className="films-list">
        {searchResults.map((film) => (
          <div key={film.id} className="film-card">
            <img 
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} 
              alt={film.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
              }}
            />
            <h3>{film.title}</h3>
            <p>{film.overview}</p>
            <Link to={`/film/${film.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;