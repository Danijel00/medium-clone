import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';
import { feedActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../helpers/loading/loading.component';
import { ErrorMessageComponent } from '../helpers/error-message/error-message.component';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [CommonModule, RouterLink, ErrorMessageComponent, LoadingComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = '';

  constructor(private store: Store) { }

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  })

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl }))
  }
}
