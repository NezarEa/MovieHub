import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilm } from '../store/filmsSlice';
import './AddFilm.css';

const AddFilm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
  });
  const dispatch = useDispatch();
  const { addedFilms } = useSelector((state) => state.films);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      dispatch(addFilm(formData));
      setFormData({ title: '', description: '', releaseDate: '' });
      alert('Film added successfully!');
    } else {
      alert('Please fill in title and description.');
    }
  };

  return (
    <div className="page-content">
      <h1>Add a New Film</h1>
      <div className="add-film-form">
        <div className="form-group">
          <label>Title (required):</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description (required):</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Release Date (optional):</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="submit-btn"
        >Add Film</button>
      </div>
      
      {addedFilms.length > 0 && (
        <>
          <h1 className="added-films-title">Your Added Films</h1>
          <div className="films-list">
            {addedFilms.map((film, index) => (
              <div key={index} className="film-card">
                <h3>{film.title}</h3>
                <p>{film.description}</p>
                {film.releaseDate && (
                  <p className="release-date">
                    <strong>Release Date:</strong> {film.releaseDate}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AddFilm;