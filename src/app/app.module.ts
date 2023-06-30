import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorDialogComponent } from './shared/components/dialog/error-dialog/error-dialog.component';
import { environment } from 'src/environments/environment';
import { reducers } from './store/movie-reducer';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './store/movie-effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true
    }),
    //Criar um modulo para o Movie
    StoreModule.forFeature('movie', reducers),
    EffectsModule.forFeature([ MovieEffects ])
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
