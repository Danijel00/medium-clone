import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserProfileService } from "../services/user-profile.service";
import { inject } from "@angular/core";
import { userProfileActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { UserProfileInterface } from "../types/userProfile.interface";
import { FollowProfileService } from "../services/follow-profile.service";

export const getUserProfileEffect = createEffect((
  actions$ = inject(Actions),
  userProfileService = inject(UserProfileService)
) => {
  return actions$.pipe(
    ofType(userProfileActions.getUserProfile),
    switchMap(({ slug }) => {
      return userProfileService.getUserProfile(slug).pipe(
        map((userProfile: UserProfileInterface) => {
          return userProfileActions.getUserProfileSuccess({ userProfile })
        }),
        catchError(() => {
          return of(userProfileActions.getUserProfileFailure())
        })
      )
    })
  )
}, { functional: true })

export const followUserProfileEffect = createEffect((
  actions$ = inject(Actions),
  followProfileService = inject(FollowProfileService),
) => {
  return actions$.pipe(
    ofType(userProfileActions.followProfile),
    switchMap(({ isFollowing, username }) => {
      const profile$ = isFollowing
        ? followProfileService.unfollowUser(username)
        : followProfileService.followUser(username)

      return profile$.pipe(
        map((userProfile: UserProfileInterface) => {
          return userProfileActions.followProfileSuccess({ userProfile })
        }),
        catchError(() => {
          return of(userProfileActions.followProfileFailure())
        })
      )
    })
  )
}, { functional: true })
