import { createAction, props } from '@ngrx/store'
import { Time } from '../../interfaces/time.interface'

export const initTimes = createAction('[time] init times')

export const setTimes = createAction('[time] set times', props<Time>())
