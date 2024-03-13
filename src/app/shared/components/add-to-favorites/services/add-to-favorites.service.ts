import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleInterface } from '../../../types/article.interface';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ArticleResponseInterface } from '../../../types/articleResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AddToFavoritesService {
  constructor(private http: HttpClient) { }

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http
      .post<ArticleResponseInterface>(url, {})
      .pipe(map(this.getArticle))
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http
      .delete<ArticleResponseInterface>(url)
      .pipe(map(this.getArticle))
  }

  getUrl(slug: string): string {
    return `${environment.API_URL}/articles/${slug}/favorite`
  }

  getArticle(response: ArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}
