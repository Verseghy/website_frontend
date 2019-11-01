import { competitionFeatureKey, State } from './competition.reducer'
import { createSelector } from '@ngrx/store'
import { Merged } from '../../interfaces/merged.interface'

const selectCompetition = state => state[competitionFeatureKey]

export const selectTeam = createSelector(
  selectCompetition,
  state => state.teamID
)

export const selectProblems = createSelector(
  selectCompetition,
  (competition: State) => competition.problems.sort((a, b) => a.id - b.id)
)

export const selectSolutions = createSelector(
  selectCompetition,
  (competition: State) => competition.solutions.sort((a, b) => a.id - b.id)
)

export const selectMerged = createSelector(
  selectProblems,
  selectSolutions,
  (problems, solutions): Merged[] => {
    return problems.map(e => {
      const solution = solutions.find(v => v.id === e.id)
      return {
        ...e,
        solution: solution ? solution.solution : null,
      }
    })
  }
)
