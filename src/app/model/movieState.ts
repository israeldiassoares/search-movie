import { Movie } from './movie';

export interface MovieState {
  isLoading: boolean;
  movie: Movie[],
  error: string | null
}
