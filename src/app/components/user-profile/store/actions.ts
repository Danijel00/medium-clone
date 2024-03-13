import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { UserProfileInterface } from '../types/userProfile.interface';

export const userProfileActions = createActionGroup({
  source: 'User profile',
  events: {
    'Get user profile': props<{ slug: string }>(),
    'Get user profile success': props<{ userProfile: UserProfileInterface }>(),
    'Get user profile failure': emptyProps(),

    'Follow profile': props<{ isFollowing: boolean, username: string }>(),
    'Follow profile success': props<{ userProfile: UserProfileInterface }>(),
    'Follow profile failure': emptyProps(),
  },
})
