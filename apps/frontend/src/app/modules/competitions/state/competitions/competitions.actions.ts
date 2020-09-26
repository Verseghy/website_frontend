import { createAction, props } from '@ngrx/store'
import { Competition } from '../../models/competition'

export const loadRecentCompetitions = createAction('[competitions] Load Recent Competitions')

export const loadCompetitionsSuccess = createAction('[competitions] Load Competitions Success', props<{ competitions: Competition[] }>())

export const loadCompetitionsFailure = createAction('[competitions] Load Competitions Failure', props<{ error: any }>())

export const selectCompetition = createAction('[competitions] Select Competition', props<{ selectedID: number }>())
