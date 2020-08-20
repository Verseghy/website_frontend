import { createAction, props } from '@ngrx/store'
import { CompetitionsEntity } from './competitions.models'

export const loadCompetitions = createAction('[Competitions] Load Competitions')

export const loadCompetitionsSuccess = createAction(
  '[Competitions] Load Competitions Success',
  props<{ competitions: CompetitionsEntity[] }>()
)

export const loadCompetitionsFailure = createAction('[Competitions] Load Competitions Failure', props<{ error: any }>())
