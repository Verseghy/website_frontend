import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, concatMap } from 'rxjs/operators'
import { EMPTY, of } from 'rxjs'

import * as ArchiveActions from './archive.actions'
import { ArchiveService } from '../archive.service'

@Injectable()
export class ArchiveEffects {
  loadArchives$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArchiveActions.loadArchives),
      concatMap(() =>
        this.archiveService.getArchives().pipe(
          map((data) => ArchiveActions.loadArchivesSuccess({ data })),
          catchError((error) => of(ArchiveActions.loadArchivesFailure({ error })))
        )
      )
    )
  )

  loadArchivesDetailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArchiveActions.loadArchivesDetail),
      concatMap(({ year, month }: { year: number; month: number }) =>
        this.archiveService.getDetailedArchives({ year, month }).pipe(
          map((data) => ArchiveActions.loadArchivesDetailSuccess({ data })),
          catchError((error) => of(ArchiveActions.loadArchivesDetailFailure({ error })))
        )
      )
    )
  )

  constructor(private actions$: Actions, private archiveService: ArchiveService) {}
}
