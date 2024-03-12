import { provideEffects } from '@ngrx/effects';
import { ArticleComponent } from './article.component';
import * as articleEffects from './store/effects'

import { Routes } from "@angular/router";
import { articleFeatureKey, articleReducer } from './store/reducers';
import { provideState } from '@ngrx/store';

// This only belongs to this component
export const articleRoutes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(articleEffects),
      provideState(articleFeatureKey, articleReducer)
    ]
  }
]
