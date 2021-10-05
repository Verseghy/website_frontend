import { Action, createReducer, on } from '@ngrx/store'
import * as ArchiveActions from './archive.actions'

export const archiveFeatureKey = 'archive'

export interface State {
  archives: { id: number; title: string; description: string; date: string }[]
  archivesList: { count: number; year: number; month: number }[]
  error: any
  loading: boolean
}

export const initialState: State = {
  archives: [],
  archivesList: [],
  error: null,
  loading: true,
}

const archiveReducer = createReducer(
  initialState,

  on(ArchiveActions.loadArchives, (state) => state),
  on(ArchiveActions.loadArchivesSuccess, (state, action) => ({ ...state, archivesList: action.data, loading: false })),
  on(ArchiveActions.loadArchivesFailure, (state, action) => ({ ...state, error: action.error, loading: false })),
  on(ArchiveActions.loadArchivesDetail, (state) => ({ ...state, archives: [] })),
  on(ArchiveActions.loadArchivesDetailSuccess, (state, action) => ({ ...state, archives: action.data }))
)

export function reducer(state: State | undefined, action: Action) {
  return archiveReducer(state, action)
}
