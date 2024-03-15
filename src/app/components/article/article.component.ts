import { CurrentUserInterface } from './../../shared/types/currentUser.interface';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../shared/components/helpers/loading/loading.component';
import { ErrorMessageComponent } from '../../shared/components/helpers/error-message/error-message.component';
import { TagListComponent } from '../../shared/components/tag-list/tag-list.component';
import { selectArticleData, selectError, selectIsLoading } from './store/reducers';
import { articleActions } from './store/actions';
import { combineLatest, filter, map } from 'rxjs';
import { selectCurrentUser } from '../../auth/store/reducers';
import { FollowProfileComponent } from '../../shared/components/follow-profile/follow-profile.component';
import { AddToFavoritesComponent } from '../../shared/components/add-to-favorites/add-to-favorites.component';
@Component({
  selector: 'mc-article',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
    FollowProfileComponent,
    AddToFavoritesComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  iconPath: string = 'assets/svg/icons.svg';
  slug: string = this.route.snapshot.paramMap.get('slug') ?? '';

  // To differentiate between currently logged in user, and guest user
  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store.select(selectCurrentUser).pipe(
      // Only return current user or null
      filter((currentUser): currentUser is CurrentUserInterface | null =>
        currentUser !== undefined
      )
    )
  }).pipe(
    map(({ article, currentUser }) => {
      // If not the current user
      if (!article || !currentUser) return false;
      return article.author.username === currentUser.username
    })
  )

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  })

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }))
  }

  deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }))
  }
}
