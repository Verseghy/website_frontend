import { createAction, props } from '@ngrx/store'

export const loadArchives = createAction('[Archive] Load Archives')

export const loadArchivesSuccess = createAction('[Archive] Load Archives Success', props<{ data: any }>())

export const loadArchivesFailure = createAction('[Archive] Load Archives Failure', props<{ error: any }>())

export const loadArchivesDetail = createAction('[Archive] Load Archive Detail', props<{ year: number; month: number }>())

export const loadArchivesDetailSuccess = createAction('[Archive] Load Archive Detail Success', props<{ data: any }>())

export const loadArchivesDetailFailure = createAction('[Archive] Load Archive Detail Failure', props<{ error: any }>())
