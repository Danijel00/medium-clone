import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { CurrentUserRequestInterface } from '../../shared/types/currentUserRequest.interface';

export const authActions = createActionGroup({
  source: "auth",
  events: {
    // Register user
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),

    // Login user
    Login: props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorsInterface }>(),

    // Get the current user
    'Get current user': emptyProps(),
    'Get current user success': props<{ currentUser: CurrentUserInterface }>(),
    'Get current user failure': emptyProps(),

    // Update the current user
    'Update current user': props<{ currentUserRequest: CurrentUserRequestInterface }>(),
    'Update current user success': props<{ currentUser: CurrentUserInterface }>(),
    'Update current user failure': props <{ errors: BackendErrorsInterface }>(),

    Logout: emptyProps(),
  }
});
