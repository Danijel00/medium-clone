import { inject } from '@angular/core';
import { PopularTagsService } from './../services/popular-tags.service';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { popularTagsActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { PopularTagType } from '../../../types/popularTag.type';

export const getPopularTagsEffect = createEffect((
  actions$ = inject(Actions),
  popularTagsService = inject(PopularTagsService)
) => {
  return actions$.pipe(
    ofType(popularTagsActions.getPopularTags),
    switchMap(() => {
      return popularTagsService.getPopularTags().pipe(
        map((popularTags: PopularTagType[]) => {
          return popularTagsActions.getPopularTagsSuccess({ popularTags })
        }),
        catchError(() => {
          return of(popularTagsActions.getPopularTagsFailure())
        })
      )
    })
  )
}, { functional: true })
