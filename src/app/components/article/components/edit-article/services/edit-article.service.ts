import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleRequestInterface } from '../../../../../shared/types/articleRequest.interface';
import { Observable, map } from 'rxjs';
import { ArticleInterface } from '../../../../../shared/types/article.interface';
import { ArticleResponseInterface } from '../../../../../shared/types/articleResponse.interface';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EditArticleService {
  constructor(private http: HttpClient) { }

  editArticle(
    updateArticle: ArticleRequestInterface, slug: string
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.API_URL}/articles/${slug}`
    return this.http.put<ArticleResponseInterface>(fullUrl, updateArticle)
      .pipe(map((response: ArticleResponseInterface) => response.article))
  }
}
