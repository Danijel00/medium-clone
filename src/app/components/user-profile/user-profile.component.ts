import { UserProfileInterface } from './types/userProfile.interface';
import { CurrentUserInterface } from './../../shared/types/currentUser.interface';
import { Store, select } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FeedComponent } from '../../shared/components/feed/feed.component';
import { userProfileActions } from './store/actions';
import { combineLatest, filter, map } from 'rxjs';
import { selectError, selectIsLoading, selectUserProfileData } from './store/reducers';
import { selectCurrentUser } from '../../auth/store/reducers';

@Component({
  selector: 'mc-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FeedComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  public iconPath: any = 'assets/svg/icons.svg';
  private slug: string = '';

  private isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      // Filter out null or undefined user
      filter((currentUser): currentUser is CurrentUserInterface | null =>
        // Must be undefined, boolean only checks logged in user
        currentUser !== undefined
      )
    ),
    userProfile: this.store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is UserProfileInterface =>
        Boolean(userProfile)
      )
    )
    // Destructuring currentUser and userProfile
  }).pipe(map(({ currentUser, userProfile }) => {
    return currentUser?.username === userProfile.username;
  }))

  public data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$
  })

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.slug = params['slug'];
      this.fetchUserProfile();
    })
  }

  fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({ slug: this.slug }))
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`
  }
}
