import { createAction, props } from '@ngrx/store'
import { Problem } from '../../interfaces/problem.interface'

export const loadProblems = createAction(
  '[Competition] Load Problems'
)

export const loadTeam = createAction(
  '[Competition] Load Team'
)

export const loadTeamSucceed = createAction(
  '[Competition] Load Team Succeed',
  props<{id: string}>()
)

export const problemAdded = createAction(
  '[Competition] Problem Added',
  props<Problem>()
)

export const problemModified = createAction(
  '[Competition] Problem Modified',
  props<Problem>()
)

export const problemRemoved = createAction(
  '[Competition] Problem Removed',
  props<Problem>()
)



