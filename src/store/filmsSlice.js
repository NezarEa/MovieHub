import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // TMDb API Key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularFilms = createAsyncThunk(
  'films/fetchPopular',
  async () => {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    return response.data.results;
  }
);

export const searchFilms = createAsyncThunk(
  'films/search',
  async (query) => {
    const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    return response.data.results;
  }
);

export const fetchFilmDetails = createAsyncThunk(
  'films/fetchDetails',
  async (id) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    return response.data;
  }
);

const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    popular: [],
    searchResults: [],
    selectedFilm: null,
    addedFilms: [],
    loading: false,
    error: null,
  },
  reducers: {
    addFilm: (state, action) => {
      state.addedFilms.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularFilms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      })
      .addCase(fetchPopularFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchFilms.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFilmDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilmDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFilm = action.payload;
      })
      .addCase(fetchFilmDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addFilm } = filmsSlice.actions;
export default filmsSlice.reducer;
