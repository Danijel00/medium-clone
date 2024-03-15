import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable, map } from 'rxjs';
import { UserProfileInterface } from '../../../../components/user-profile/types/userProfile.interface';
import { GetUserProfileResponseInterface } from '../../../../components/user-profile/types/getUserProfile.interface';

@Injectable({
  providedIn: 'root'
})
export class FollowProfileService {
  constructor(private http: HttpClient) { }

  followUser(username: string): Observable<UserProfileInterface> {
    const url = this.getUrl(username);
    return this.http.post<GetUserProfileResponseInterface>(url, {}).
      pipe(map(this.getProfile))
  }

  unfollowUser(username: string): Observable<UserProfileInterface> {
    const url = this.getUrl(username);
    return this.http.delete<GetUserProfileResponseInterface>(url).
      pipe(map(this.getProfile))
  }

  getUrl(username: string): string {
    return `${environment.API_URL}/profiles/${username}/follow`
  }

  getProfile(response: GetUserProfileResponseInterface): UserProfileInterface {
    return response.profile;
  }
}
