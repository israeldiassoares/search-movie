import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import * as MovieActions from './movie-actions'
import { catchError, map, mergeMap, of, } from 'rxjs';
import { MovieService } from '../services/movie/movie.service';

@Injectable()
export class MovieEffects {


  getMovie$ = createEffect(() => this.actions$.pipe(ofType(MovieActions.getMovie), mergeMap(() => {


    return this.movieService.getMovieByTitle(MovieActions.getMovie({}))
      .pipe(map(movie => MovieActions.getMovieSuccess({ movie })), catchError(error => of(MovieActions.getMovieFailure({ error: error.message }))))

  })))

  constructor(private actions$: Actions, private movieService: MovieService) {

  }

}
