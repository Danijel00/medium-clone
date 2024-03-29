import { provideState } from '@ngrx/store';
import { Routes } from '@angular/router'
import { CreateArticleComponent } from './create-article.component'
import { CreateArticleService } from './services/create-article.service'
import { provideEffects } from '@ngrx/effects'
import * as createArticleEffects from './store/effects'
import { createArticleFeatureKey, createArticleReducer } from './store/reducers';


export const createArticleRoutes: Routes = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      CreateArticleService,
      provideEffects(createArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer)
    ]
  },
]
