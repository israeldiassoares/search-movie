import { createAction, props } from '@ngrx/store';
import { Movie } from '../model/movie';

export const getMovie = createAction('[Movie] Get Movie', props<Partial<{ titleMovie: string }>>())

export const getMovieSuccess = createAction(
  '[Movie] Get Movie Success',
  props<{ movie: Movie[] }>()
)

export const getMovieFailure = createAction(
  '[Movie] Get Movie Failure',
  props<{ error: string }>()
)
