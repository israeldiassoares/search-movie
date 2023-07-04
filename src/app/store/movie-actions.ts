import { createAction, props } from '@ngrx/store';
import { Movie } from '../model/movie';
import { Error } from '../model/error'

export const getMovie = createAction('[Movie] Get Movie', props<{ titleMovie: string }>())

export const getMovieSuccess = createAction(
  '[Movie] Get Movie Success',
  props<{ movie: Movie }>()
)

export const getMovieFailure = createAction(
  '[Movie] Get Movie Failure',
  props<{ error: Error }>()
)
