import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { authActions } from "./actions";
import { EMPTY, catchError, map, of, switchMap } from "rxjs";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from "../../shared/services/persistance.service";
import { Router } from "@angular/router";

// Register effect //
export const registerEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistanceService = inject(PersistanceService)
) => {
  return actions$.pipe(
    // Type of action, success or error on registration
    ofType(authActions.register),
    // Registration request
    switchMap(({ request }) => {
      return authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          // Local storage setting item
          persistanceService.set('accessToken', currentUser.token)
          // Return if user registration is successful
          return authActions.registerSuccess({ currentUser })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          // Return if user registration has failed
          return of(
            authActions.registerFailed({
              errors: errorResponse.error.errors
            })
          )
        })
      )
    })
  )
}, { functional: true })

// Redirect after Register effect //
export const redirectAfterRegistrationEffect = createEffect((
  actions$ = inject(Actions),
  router = inject(Router),
) => {
  return actions$.pipe(
    ofType(authActions.registerSuccess),
    switchMap(() => {
      router.navigateByUrl('/');
      return EMPTY;
    })
  )
}, { functional: true, dispatch: false })

// Login effect //
export const loginEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistanceService = inject(PersistanceService)
) => {
  return actions$.pipe(
    ofType(authActions.login),
    switchMap(({ request }) => {
      return authService.login(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          // Local storage setting item
          persistanceService.set('accessToken', currentUser.token)
          // Return if user registration is successful
          return authActions.loginSuccess({ currentUser })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          // Return if user registration has failed
          return of(
            authActions.loginFailed({
              errors: errorResponse.error.errors
            })
          )
        })
      )
    })
  )
}, { functional: true })

// Redirect after Login effect //
export const redirectAfterLoginEffect = createEffect((
  actions$ = inject(Actions),
  router = inject(Router),
) => {
  return actions$.pipe(
    ofType(authActions.loginSuccess),
    switchMap(() => {
      router.navigateByUrl('/');
      return EMPTY;
    })
  )
}, { functional: true, dispatch: false })

// Get current user effect //
export const getCurrentUserEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistanceService = inject(PersistanceService)
) => {
  return actions$.pipe(
    ofType(authActions.getCurrentUser),
    switchMap(() => {
      const token = persistanceService.get('accessToken');

      // If token is removed
      if (!token) return of(authActions.getCurrentUserFailed())

      return authService.getCurrentUser().pipe(
        map((currentUser: CurrentUserInterface) => {
          return authActions.getCurrentUserSuccess({ currentUser })
        }),
        catchError(() => {
          return of(
            authActions.getCurrentUserFailed()
          )
        })
      )
    })
  )
}, { functional: true })
