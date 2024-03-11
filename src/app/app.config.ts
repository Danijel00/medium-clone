import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
// Reducers
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { feedFeatureKey, feedReducer } from './shared/components/feed/store/reducers';
// Effects
import * as authEffects from './auth/store/effects'
import * as feedEffects from './shared/components/feed/store/effects'
// Interceptors
import { authInterceptor } from './shared/services/interceptors/auth.interceptor';

// TODO GO BACK TO AUTH STORE TO ADD FOR LOGOUT AND CURRENT USER
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer
    }),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideEffects(
      authEffects,
      feedEffects
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideRouterStore(),
    provideEffects()
  ]
};
