import { Action, createReducer, on } from '@ngrx/store';
import * as ArchiveActions from './archive.actions';

export const archiveFeatureKey = 'archive';

export interface State {
  archives: {
    [key: string]: {id: number, title: string, description: string, date: string}[]
  }
  error: any,
  loading: boolean
}

export const initialState: State = {
  archives: {},
  error: null,
  loading: true
};

const archiveReducer = createReducer(
  initialState,

  on(ArchiveActions.loadArchives, state => state),
  on(ArchiveActions.loadArchivesSuccess, (state, action) => ({...state, archives: action.data, loading: false})),
  on(ArchiveActions.loadArchivesFailure, (state, action) => ({...state, error: action.error, loading: false})),

);

export function reducer(state: State | undefined, action: Action) {
  return archiveReducer(state, action);
}
