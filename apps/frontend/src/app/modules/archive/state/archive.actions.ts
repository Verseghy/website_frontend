import { createAction, props } from '@ngrx/store';

export const loadArchives = createAction(
  '[Archive] Load Archives'
);

export const loadArchivesSuccess = createAction(
  '[Archive] Load Archives Success',
  props<{ data: any }>()
);

export const loadArchivesFailure = createAction(
  '[Archive] Load Archives Failure',
  props<{ error: any }>()
);
