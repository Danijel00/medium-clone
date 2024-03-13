import { provideState } from '@ngrx/store';
import { Route } from "@angular/router";
import { UserProfileComponent } from "./user-profile.component";
import { UserProfileService } from "./services/user-profile.service";
import { userProfileFeatureKey, userProfileReducer } from './store/reducers';
import { provideEffects } from '@ngrx/effects';
import * as userProfileEffects from './store/effects';

export const userProfileRoutes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
    providers: [
      UserProfileService,
      provideState(userProfileFeatureKey, userProfileReducer),
      provideEffects(userProfileEffects),
    ]
  }
]
