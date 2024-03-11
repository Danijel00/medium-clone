import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../helpers/loading/loading.component';
import { ErrorMessageComponent } from '../helpers/error-message/error-message.component';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { selectError, selectIsLoading, selectPopularTagsData } from './store/reducers';
import { popularTagsActions } from './store/actions';

@Component({
  selector: 'mc-popular-tags',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss'
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError)
  })

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags())
  }
}
