import { provideState } from '@ngrx/store';
import { Route } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { settingsFeatureKey, settingsReducer } from './store/reducerts';

export const settingsRoutes: Route[] = [
  {
    path: '',
    component: SettingsComponent,
    providers: [provideState(settingsFeatureKey, settingsReducer)]
  }
]
