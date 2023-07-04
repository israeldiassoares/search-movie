import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import { MovieService } from '../services/movie/movie.service';
import * as MovieActions from './movie-actions';

@Injectable()
export class MovieEffects {


  getMovie$ = createEffect(() => this.actions$.pipe(
    ofType(MovieActions.getMovie),
    mergeMap((action) => {
      console.log('effect', action.titleMovie)
      return this.movieService.getMovieByTitle(MovieActions.getMovie({ titleMovie: action.titleMovie }))
        .pipe(map(movie => MovieActions.getMovieSuccess({ movie })),
          catchError((error) => {
            return of(MovieActions.getMovieFailure({ error }));
          }))

    })))
  constructor(private actions$: Actions, private movieService: MovieService) {

  }

}
