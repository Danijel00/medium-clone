import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PopularTagType } from '../../../types/popularTag.type';
import { environment } from '../../../../../environments/environment.development';
import { GetPopularTagsResponseInterface } from '../types/getPopularTagsResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class PopularTagsService {
  constructor(private http: HttpClient) { }

  getPopularTags(): Observable<PopularTagType[]> {
    const fullUrl = environment.API_URL + '/tags';
    return this.http.get<GetPopularTagsResponseInterface>(fullUrl)
      .pipe(map((response) => response.tags))
  }
}
