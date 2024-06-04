import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryType} from "../../../types/category.type";
import {environment} from "../../../environments/environment";
import {ArticleType} from "../../../types/article.type";
import {ActiveParamsType} from "../../../types/active-params.type";
import {FullArticleType} from "../../../types/full-article.type";
import {CommentType} from "../../../types/comment.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {ActionType} from "../../../types/action.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {

  }

  getPopularArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }

  getArticles(params: ActiveParamsType): Observable<{ count: number, pages: number, items: ArticleType[] }> {
    return this.http.get<{ count: number, pages: number, items: ArticleType[] }>(environment.api + 'articles', {params: params});
  }

  getArticle(url: string): Observable<FullArticleType> {
    return this.http.get<FullArticleType>(environment.api + 'articles/' + url);
  }

  getRelatedArticle(url: string): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/related/' + url);
  }

  getComments(articleId: string, params: {offset?: number, article: string}): Observable<{ allCount: number, comments: CommentType[]}> {
    return this.http.get<{ allCount: number, comments: CommentType[] }>(environment.api + 'comments', {
      params: params
    })
  }

  // postLike(commentId: string): Observable<DefaultResponseType> {
  //   return this.http.post<DefaultResponseType>(environment.api + 'comments/' + commentId + '/apply-action', {"action": "like"});
  // }

  postComment(articleId: string, commentText: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      "text": commentText,
      "article": articleId
    });
  }

  postAction(commentId: string, action: 'like' | 'dislike' | 'violate'): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + commentId + '/apply-action', {action});
  }

  getActions(commentId: string): Observable<ActionType[] | DefaultResponseType> {
    return this.http.get<ActionType[] | DefaultResponseType>(environment.api + 'comments/' + commentId + '/actions')
  }
}
