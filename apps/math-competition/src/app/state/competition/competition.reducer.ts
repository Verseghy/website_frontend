import { Action, createReducer, on } from '@ngrx/store'
import * as CompetitionActions from './competition.actions'
import { Problem } from '../../interfaces/problem.interface'
import { Solution } from '../../interfaces/solution.interface'

export const competitionFeatureKey = 'competition'

export interface State {
  problems: Problem[]
  solutions: Solution[]
  teamID: string
}

export const initialState: State = {
  problems: [],
  solutions: [],
  teamID: '',
}

const competitionReducer = createReducer(
  initialState,

  on(CompetitionActions.loadTeamSucceed, (state, { id }) => ({ ...state, teamID: id })),

  on(CompetitionActions.problemAdded, (state, { problem }) => ({ ...state, problems: [...state.problems, problem] })),
  on(CompetitionActions.problemModified, (state, { problem }) => ({
    ...state,
    problems: state.problems.map((e) => {
      if (e.id !== problem.id) return e
      return problem
    }),
  })),
  on(CompetitionActions.problemRemoved, (state, { problem }) => ({
    ...state,
    problems: state.problems.filter((e) => e.id !== problem.id),
  })),

  on(CompetitionActions.solutionAdded, (state, { solution }) => ({ ...state, solutions: [...state.solutions, solution] })),
  on(CompetitionActions.solutionModified, (state, { solution }) => ({
    ...state,
    solutions: state.solutions.map((e) => {
      if (e.id !== solution.id) return e
      return solution
    }),
  })),
  on(CompetitionActions.solutionRemoved, (state, { solution }) => ({
    ...state,
    solutions: state.solutions.filter((e) => e.id !== solution.id),
  }))
)

export function reducer(state: State | undefined, action: Action) {
  return competitionReducer(state, action)
}
