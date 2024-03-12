import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { ArticleFormComponent } from '../../../../shared/components/article-form/article-form.component';
import { ArticleFormValuesInterface } from '../../../../shared/components/article-form/types/articleFormValues.interface';
import { ArticleRequestInterface } from '../../../../shared/types/articleRequest.interface';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from './store/reducers';
import { createArticleActions } from './store/actions';

@Component({
  selector: 'mc-create-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
  templateUrl: './create-article.component.html',
})
export class CreateArticleComponent {
  constructor(private store: Store) { }

  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  }

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const articleRequest: ArticleRequestInterface = {
      article: articleFormValues
    }
    this.store.dispatch(createArticleActions.createArticle({ request: articleRequest }))
  }
}
