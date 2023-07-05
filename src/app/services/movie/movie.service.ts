import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, first, Observable, of, tap } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { Error } from 'src/app/model/error';

import { getMovieFailure, getMovieSuccess } from 'src/app/store/movie-actions';
import { AppStateInterface } from 'src/app/types/AppStateInterface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly baseUrl: string = "https://www.omdbapi.com";
  private readonly apiKey: string = "744f3c90";

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppStateInterface>,
  ) { }

  getMovieByTitle(titleMovie: { titleMovie: string | null; }): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.baseUrl}/?apikey=${this.apiKey}&t=${titleMovie.titleMovie?.toString()}`).pipe(
      first(),
      tap((movie: Movie) => this.store.dispatch(getMovieSuccess({ movie })),
        catchError((error: Error) => of(this.store.dispatch(getMovieFailure({ error }))))
      ))
  }
}
