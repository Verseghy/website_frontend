import { Action, createReducer, on } from '@ngrx/store';
import * as CompetitionActions from './competition.actions';

export const competitionFeatureKey = 'competition';

// tslint:disable-next-line:no-empty-interface
export interface State {

}

export const initialState: State = {

};

const competitionReducer = createReducer(
  initialState,

  on(CompetitionActions.loadProblems, state => state),

);

export function reducer(state: State | undefined, action: Action) {
  return competitionReducer(state, action);
}
