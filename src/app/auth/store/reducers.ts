import { AuthStateInterface } from "../types/authState.interface";
import { createFeature, createReducer, on } from '@ngrx/store'
import { authActions } from "./actions";
import { routerNavigatedAction } from "@ngrx/router-store";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null
}

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    // Register //
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    // Login //
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    // Get Current user //
    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser
    })),
    on(authActions.getCurrentUserFailure, (state) => ({
      ...state,
      isLoading: false,
      // Login failed
      currentUser: null
    })),

    // Clean up validation errors on route change
    on(routerNavigatedAction, (state) => ({ ...state, validationErrors: null }))
  )
})

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature
