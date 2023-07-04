import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { Error } from 'src/app/model/error';
import { ToastService } from 'src/app/services/toast/toast.service';
import { errorSelector, isLoadingSelector, movieSelector } from 'src/app/store/movie-selectors';
import { AppStateInterface } from 'src/app/types/AppStateInterface';

import * as MovieActions from '../../store/movie-actions';
import { MovieService } from './../../services/movie/movie.service';

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

  movie$?: Observable<Movie> = undefined
  error$?: Observable<Error> = undefined
  dataSource: any = []
  isLoading$: Observable<boolean>

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private store: Store<AppStateInterface>,
    private toast: ToastService
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.movie$ = this.store.pipe(select(movieSelector))

  }

  ngOnInit() { }

  onSubmit() {
    this.store.dispatch(MovieActions.getMovie({ titleMovie: (this.form.value.titleMovie as string) }))
  }
  onReset() {
    this.form.get('titleMovie')?.reset()
  }


}
