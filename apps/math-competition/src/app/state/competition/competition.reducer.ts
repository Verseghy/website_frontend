import { Action, createReducer, on } from '@ngrx/store';
import * as CompetitionActions from './competition.actions';
import { Problem } from '../../interfaces/problem.interface'
import { Solution } from '../../interfaces/solution.interface'

export const competitionFeatureKey = 'competition';

export interface State {
  problems: Problem[]
  solutions: Solution[]
}

export const initialState: State = {
  problems: [],
  solutions: []
};

const competitionReducer = createReducer(
  initialState,

  on(CompetitionActions.loadProblems, state => state),

  on(CompetitionActions.problemAdded, (state, payload) => ({...state, problems: [...state.problems, payload]})),
  on(CompetitionActions.problemModified, (state, payload) => ({
    ...state,
    problems: state.problems.map(e => {
      if (e.id !== payload.id) return e
      return payload
    })
  })),
  on(CompetitionActions.problemRemoved, (state, payload) => ({
    ...state,
    problems: state.problems.filter(e => e.id !== payload.id)
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return competitionReducer(state, action);
}