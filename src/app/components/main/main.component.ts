import { MovieService } from './../../services/movie/movie.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Store, select } from '@ngrx/store';
import { Observable, catchError, of } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import * as MovieActions from '../../store/movie-actions'
import { errorSelector, isLoadingSelector, movieSelector } from 'src/app/store/movie-selectors';
import { AppStateInterface } from 'src/app/types/AppStateInterface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit {

  @Input() errorDialog: any
  @Input() title: string = ''

  form = this.formBuilder.group({
    titleMovie: [ '', [ Validators.required, Validators.minLength(1) ] ]
  })

  movie$?: Observable<Movie[] | never[]> = undefined
  isLoading$: Observable<boolean>
  error$: Observable<string | null>

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private store: Store<AppStateInterface>
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.movie$ = this.store.pipe(select(movieSelector))

  }

  ngOnInit() { }

  onError(errorMsg: string) {
    console.log('error exibir filme', errorMsg)
  }

  onSubmit() {
    // this.store.dispatch(MovieActions.getMovie(this.form.value))

    this.movie$ = this.movieService.getMovieByTitle(this.form.value).pipe(
      catchError(error => {
        this.onError("Erro ao carregar filme.")
        //of retorna um observable de array vazio
        return of([])
      })
    )
  }
  onReset() {
    this.form.get('titleMovie')?.reset()
  }


}
