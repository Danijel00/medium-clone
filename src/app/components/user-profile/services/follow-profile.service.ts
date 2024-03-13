import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserProfileInterface } from '../types/userProfile.interface';
import { GetUserProfileResponseInterface } from '../types/getUserProfile.interface';
import { environment } from '../../../../environments/environment.development';

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
