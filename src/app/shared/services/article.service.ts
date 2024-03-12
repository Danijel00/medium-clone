import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArticleInterface } from '../types/article.interface';
import { environment } from '../../../environments/environment.development';
import { ArticleResponseInterface } from '../types/articleResponse.interface';

@Injectable({
  providedIn: 'root'
})
// Sharable Article service
export class ArticleService {
  constructor(private http: HttpClient) { }

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.API_URL}/articles/${slug}`
    return this.http.get<ArticleResponseInterface>(fullUrl)
      .pipe(map((response) => response.article))
  }
}
