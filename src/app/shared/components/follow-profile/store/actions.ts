import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserProfileInterface } from "../../../../components/user-profile/types/userProfile.interface";

export const followProfileActions = createActionGroup({
  source: 'Follow Profile',
  events: {
    'Follow profile': props<{ isFollowing: boolean, username: string }>(),
    'Follow profile success': props<{ userProfile: UserProfileInterface }>(),
    'Follow profile failed': emptyProps(),
  }
})
