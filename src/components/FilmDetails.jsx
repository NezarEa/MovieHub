import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilmDetails } from '../store/filmsSlice';

const FilmDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedFilm, loading, error } = useSelector((state) => state.films);

  useEffect(() => {
    dispatch(fetchFilmDetails(id));
  }, [dispatch, id]);

  if (loading) return <div className="loading">Loading film details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!selectedFilm) return <div className="error">Film not found</div>;

  return (
    <div className="page-content">
      <h1>Film Details</h1>
      <div className="film-details">
        <img src={`https://image.tmdb.org/t/p/w500${selectedFilm.poster_path}`} alt={selectedFilm.title} />
        <div>
          <h2>{selectedFilm.title}</h2>
          <p><strong>Overview:</strong> {selectedFilm.overview}</p>
          <p><strong>Release Date:</strong> {selectedFilm.release_date}</p>
          <p><strong>Rating:</strong> <span className="rating">⭐ {selectedFilm.vote_average}/10</span></p>
          <p><strong>Genres:</strong> {selectedFilm.genres?.map(genre => genre.name).join(', ') || 'N/A'}</p>
          <p><strong>Runtime:</strong> {selectedFilm.runtime} minutes</p>
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;
