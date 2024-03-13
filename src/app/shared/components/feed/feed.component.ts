import { Store } from '@ngrx/store';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { feedActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../helpers/loading/loading.component';
import { ErrorMessageComponent } from '../helpers/error-message/error-message.component';
import { environment } from '../../../../environments/environment.development';
import { PaginationComponent } from '../pagination/pagination.component';
import queryString from 'query-string';
import { TagListComponent } from '../tag-list/tag-list.component';
import { AddToFavoritesComponent } from '../add-to-favorites/add-to-favorites.component';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() apiUrl: string = '';
  pageLimit = environment.PAGE_LIMIT;
  baseUrl = this.router.url.split('?')[0];
  currentPage: number = 0;

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  })

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1')
      // Needs to be refetch when changing query params
      this.fetchFeed()
    })
  }

  // Needed for popular tags
  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged = !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    // Refetch if api url changed
    if (isApiUrlChanged)
      return this.fetchFeed();
  }

  fetchFeed() {
    const pageOffset = this.currentPage * this.pageLimit - this.pageLimit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.pageLimit,
      offset: pageOffset,
      ...parsedUrl.query
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }))
  }
}
