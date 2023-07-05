import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Error } from 'src/app/model/error';
import { Movie } from 'src/app/model/movie';
import { errorSelector, isLoadingSelector, movieSelector } from 'src/app/store/movie-selectors';
import { AppStateInterface } from 'src/app/types/AppStateInterface';

import * as MovieActions from '../../store/movie-actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit {

  @Input() title: string = ''

  form = this.formBuilder.group({
    titleMovie: [ '', [ Validators.required, Validators.minLength(1) ] ]
  })

  movie$?: Observable<Movie> = undefined
  error$?: Observable<Error> = undefined
  isLoading$: Observable<boolean>

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppStateInterface>,
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.movie$ = this.store.pipe(select(movieSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }

  ngOnInit() {
  }

  onSubmit() {
    this.store.dispatch(MovieActions.getMovie({ titleMovie: (this.form.value.titleMovie as string) }))
  }
  onReset() {
    this.form.get('titleMovie')?.reset()
    this.movie$ = undefined
  }


}
