import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserProfileInterface } from '../types/userProfile.interface';
import { environment } from '../../../../environments/environment.development';
import { GetUserProfileResponseInterface } from '../types/getUserProfile.interface';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private http: HttpClient) { }

  getUserProfile(slug: string): Observable<UserProfileInterface> {
    const fullUrl = `${environment.API_URL}/profiles/${slug}`;
    return this.http.get<GetUserProfileResponseInterface>(fullUrl)
      .pipe(map((response) => response.profile))
  }
}
