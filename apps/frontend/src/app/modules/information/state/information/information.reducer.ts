import { Action, createReducer, on } from '@ngrx/store'
import * as InformationActions from './information.actions'
import { MenuItem } from '../../models/menu-item'
import { PageData } from '../../../../models/page'

export const informationFeatureKey = 'information'

export interface InformationPartialState {
  readonly [informationFeatureKey]: State
}

export interface State {
  menuItems: MenuItem[]
  page?: PageData
  error?: any
  loadedMenu: boolean
  loadedPage: boolean
}

export const initialState: State = {
  menuItems: [],
  loadedMenu: false,
  loadedPage: false,
}

export const reducer = createReducer(
  initialState,

  on(InformationActions.queryMenuItems, (state) => ({ ...state, loadedMenu: false, error: null })),
  on(InformationActions.queryMenuItemsSuccess, (state, action) => ({ ...state, menuItems: action.data, loadedMenu: true })),
  on(InformationActions.queryMenuItemsFailure, (state, action) => ({ ...state, error: action.error })),

  on(InformationActions.queryPage, (state) => ({ ...state, loadedPage: false, error: null })),
  on(InformationActions.queryPageSuccess, (state, action) => ({ ...state, page: action.data, loadedPage: true })),
  on(InformationActions.queryPageFailure, (state, action) => ({ ...state, error: action.error }))
)
