import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularFilms } from '../store/filmsSlice';
import { Link } from 'react-router-dom';


const Home = () => {
  const dispatch = useDispatch();
  const { popular, loading, error } = useSelector((state) => state.films);

  useEffect(() => {
    dispatch(fetchPopularFilms());
  }, [dispatch]);

  return (
    <div className="page-content">
      <h1>Popular Films</h1>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      <div className="films-list">
        {popular.map((film) => (
          <div key={film.id} className="film-card">
            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} />
            <h3>{film.title}</h3>
            <p>{film.overview}</p>
            <Link to={`/film/${film.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
