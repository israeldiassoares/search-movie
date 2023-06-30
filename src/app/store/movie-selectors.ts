import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../types/AppStateInterface';

export const selectFeature = (state: AppStateInterface) => state.movie

export const isLoadingSelector = createSelector(selectFeature, (state) => state.isLoading)

export const movieSelector = createSelector(selectFeature, (state) => state.movie)

export const errorSelector = createSelector(selectFeature, (state) => state.error)
