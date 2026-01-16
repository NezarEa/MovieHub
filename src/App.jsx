import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import AddFilm from './components/AddFilm';
import FilmDetails from './components/FilmDetails';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recherche">Search</Link></li>
          <li><Link to="/ajouter">Add Film</Link></li>
        </ul>
      </nav>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recherche" element={<Search />} />
          <Route path="/ajouter" element={<AddFilm />} />
          <Route path="/film/:id" element={<FilmDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
