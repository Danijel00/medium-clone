import { provideState } from '@ngrx/store';
import { Route } from '@angular/router'
import { EditArticleComponent } from './edit-article.component'
import { EditArticleService } from './services/edit-article.service'
import { provideEffects } from '@ngrx/effects'
import * as editArticleEffects from './store/effects'
import { editArticleFeatureKey, editArticleReducer } from './store/reducers';

export const editArticleRoutes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      EditArticleService,
      provideEffects(editArticleEffects),
      provideState(editArticleFeatureKey, editArticleReducer)
    ]
  },
]
