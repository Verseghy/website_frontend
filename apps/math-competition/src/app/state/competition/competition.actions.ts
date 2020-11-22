import { createAction, props } from '@ngrx/store'
import { Problem } from '../../interfaces/problem.interface'
import { Solution } from '../../interfaces/solution.interface'

export const loadTeam = createAction('[Competition] Load Team')

export const loadTeamSucceed = createAction('[Competition] Load Team Succeed', props<{ id: string }>())

export const loadProblems = createAction('[Competition] Load Problems')

export const problemAdded = createAction('[Competition] Problem Added', props<Problem>())

export const problemModified = createAction('[Competition] Problem Modified', props<Problem>())

export const problemRemoved = createAction('[Competition] Problem Removed', props<Problem>())

export const setProblem = createAction('[Competition] Problem Set', props<Problem>())

export const removeProblem = createAction('[Competition] Problem Remove', props<{ id: number }>())

export const loadSolutions = createAction('[Competition] Load Solutions')

export const solutionAdded = createAction('[Competition] Solutions Added', props<Solution>())

export const solutionModified = createAction('[Competition] Solutions Modified', props<Solution>())

export const solutionRemoved = createAction('[Competition] Solutions Removed', props<Solution>())

export const setSolution = createAction('[Competition] Solution Set', props<Solution>())
