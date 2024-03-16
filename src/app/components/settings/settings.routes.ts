import { provideState } from '@ngrx/store';
import { Routes } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { settingsFeatureKey, settingsReducer } from './store/reducers';

export const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    providers: [provideState(settingsFeatureKey, settingsReducer)]
  }
]
