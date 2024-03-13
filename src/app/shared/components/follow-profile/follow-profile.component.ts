import { Store } from '@ngrx/store';
import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userProfileActions } from '../../../components/user-profile/store/actions';

@Component({
  selector: 'mc-follow-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './follow-profile.component.html',
  styleUrl: './follow-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowProfileComponent implements OnChanges {
  public iconPath: any = 'assets/svg/icons.svg';
  public follow: string = '';
  slug: string = ''
  @Input() isFollowing: boolean = false;
  @Input() userProfile: string = '';

  constructor(private store: Store) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.hasOwnProperty('isFollowing')) {
      this.follow = this.isFollowing ? 'Unfollow' : 'Follow';
    }
  }

  handleFollow() {
    this.store.dispatch(
      userProfileActions.followProfile({
        isFollowing: this.isFollowing,
        username: this.userProfile
      })
    )
    this.follow = this.isFollowing ? 'Follow' : 'Unfollow';
    this.isFollowing = !this.isFollowing;
  }
}


