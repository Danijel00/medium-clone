import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { catchError, map, of, switchMap } from "rxjs";
import { followProfileActions } from "./actions";
import { FollowProfileService } from "../services/follow-profile.service";
import { UserProfileInterface } from "../../../../components/user-profile/types/userProfile.interface";

export const followProfileEffect = createEffect((
  actions$ = inject(Actions),
  followProfileService = inject(FollowProfileService),
) => {
  return actions$.pipe(
    ofType(followProfileActions.followProfile),
    switchMap(({ isFollowing, username }) => {
      const profile$ = isFollowing
        ? followProfileService.unfollowUser(username)
        : followProfileService.followUser(username)
      return profile$.pipe(
        map((userProfile: UserProfileInterface) => {
          return followProfileActions.followProfileSuccess({ userProfile })
        }),
        catchError(() => {
          return of(followProfileActions.followProfileFailed())
        })
      )
    })
  )
}, { functional: true })
