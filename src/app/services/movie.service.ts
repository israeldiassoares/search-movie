import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Movie } from './../model/movie';
import { Observable, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly baseUrl: string = "https://www.omdbapi.com";
  private readonly apiKey: string = "744f3c90";

  constructor(private httpClient: HttpClient) { }

  getMovieByTitle(titleMovie: Partial<{ titleMovie: string | null; }>): Observable<Movie> {
    console.log('title', titleMovie.titleMovie)
    return this.httpClient.get<Movie>(`${this.baseUrl}/?apikey=${this.apiKey}&t=${titleMovie.titleMovie}`).pipe(first(), tap((movie: Movie) => console.log('movie', movie)))
  }
}
