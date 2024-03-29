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
import { popularTagsFeatureKey, popularTagsReducer } from './shared/components/popular-tags/store/reducers';
// Effects
import * as authEffects from './auth/store/effects'
import * as feedEffects from './shared/components/feed/store/effects'
import * as popularTagsEffects from './shared/components/popular-tags/store/effects'
import * as addToFavoritesEffects from './shared/components/add-to-favorites/store/effects'
import * as followProfileEffects from './shared/components/follow-profile/store/effects'
// Interceptors
import { authInterceptor } from './shared/services/interceptors/auth.interceptor';
import { AddToFavoritesService } from './shared/components/add-to-favorites/services/add-to-favorites.service';
import { FollowProfileService } from './shared/components/follow-profile/services/follow-profile.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer
    }),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideEffects(
      authEffects,
      feedEffects,
      popularTagsEffects,
      addToFavoritesEffects,
      followProfileEffects
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideRouterStore(),
    provideEffects(),
    AddToFavoritesService,
    FollowProfileService,
  ]
};
