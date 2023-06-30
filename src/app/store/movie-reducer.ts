import { createReducer, on } from '@ngrx/store';
import { MovieState } from './../model/movieState';
import * as MovieActions from './movie-actions'
export const initialState: MovieState = {
  isLoading: false,
  movie: [ {
    Title: '',
    Year: '',
    Rated: '',
    Released: '',
    Runtime: '',
    Genre: '',
    Director: '',
    Writer: '',
    Actors: '',
    Plot: '',
    Language: '',
    Country: '',
    Awards: '',
    Poster: '',
    Ratings: [],
    Metascore: '',
    imdbRating: '',
    imdbVotes: '',
    imdbID: '',
    Type: '',
    totalSeasons: '',
    Response: ''
  } ],
  error: null
}

export const reducers = createReducer(initialState,
  on(MovieActions.getMovie, (state) => ({ ...state, isLoading: true })),

  on(MovieActions.getMovieSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    movie: action.movie
  })),

  on(MovieActions.getMovieFailure, (state, action) => ({ ...state, isLoading: false, error: action.error }))
)
