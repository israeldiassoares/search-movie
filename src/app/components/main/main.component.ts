import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'

import { Observable, catchError, of } from 'rxjs';
import { Movie } from 'src/app/model/movie';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit {

  form = this.formBuilder.group({
    titleMovie: [ '', [ Validators.required, Validators.minLength(1) ] ]
  })

  movie$: Observable<Movie> | null = null

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder) { }

  ngOnInit() { }

  onError(errorMsg: string) {
    console.log('error exibir dialog', errorMsg)
    // this.dialog.open(ErrorDialogComponent, {
    //   data: errorMsg
    // })
  }

  onSubmit() {
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
