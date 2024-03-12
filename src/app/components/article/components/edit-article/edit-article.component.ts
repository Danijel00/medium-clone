import { ArticleInterface } from './../../../../shared/types/article.interface';
import { Store, select } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { editArticleActions } from './store/actions';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { ArticleFormValuesInterface } from '../../../../shared/components/article-form/types/articleFormValues.interface';
import { selectArticle, selectIsLoading, selectIsSubmitting, selectValidationErrors } from './store/reducers';
import { LoadingComponent } from '../../../../shared/components/helpers/loading/loading.component';
import { ArticleFormComponent } from '../../../../shared/components/article-form/article-form.component';
import { ArticleRequestInterface } from '../../../../shared/types/articleRequest.interface';

@Component({
  selector: 'mc-edit-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, LoadingComponent],
  templateUrl: './edit-article.component.html',
})
export class EditArticleComponent implements OnInit {
  private initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList
      }
    })
  )
  private slug: string = this.route.snapshot.paramMap.get('slug') ?? '';

  public data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$,
  })

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({ slug: this.slug }));
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const articleRequest: ArticleRequestInterface = {
      article: articleFormValues,
    }
    this.store.dispatch(
      editArticleActions.updateArticle({ request: articleRequest, slug: this.slug })
    )
  }
}
