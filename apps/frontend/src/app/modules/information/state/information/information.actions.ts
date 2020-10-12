import { createAction, props } from '@ngrx/store'
import { MenuItem } from '../../models/menu-item'
import { PageData } from '../../../../models/page'

export const queryMenuItems = createAction('[Information] Query Menu Items')

export const queryMenuItemsSuccess = createAction('[Information] Query Menu Items Success', props<{ data: MenuItem[] }>())

export const queryMenuItemsFailure = createAction('[Information] Query Menu Items Failure', props<{ error: any }>())

export const queryPage = createAction('[Information] Query Page', props<{ slug: string }>())

export const queryPageSuccess = createAction('[Information] Query Page Success', props<{ data: PageData }>())

export const queryPageFailure = createAction('[Information] Query Page Failure', props<{ error: any }>())
