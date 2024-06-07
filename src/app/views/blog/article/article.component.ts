import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FullArticleType} from "../../../../types/full-article.type";
import {environment} from "../../../../environments/environment";
import {ArticleType} from "../../../../types/article.type";
import {CommentType} from "../../../../types/comment.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {ActionType} from "../../../../types/action.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, Observable, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {

  article: FullArticleType | undefined;
  comments: CommentType[] | undefined;
  relatedArticle!: ArticleType[];
  serverStaticPath = environment.serverStaticPath;
  isMoreComments: boolean = false;
  commentField: string = '';
  isLoading: boolean = false;


  constructor(private articleService: ArticleService,
              private activatedRouter: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private authService: AuthService,) {
  }

  ngOnInit() {

    this.activatedRouter.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe((data: FullArticleType) => {
          this.article = data;
          this.comments = this.article.comments;
          if (this.article.commentsCount > 3) {
            this.isMoreComments = true;
          }
          this.checkAndSetIsActionsStatus(this.comments);
        })
    });

    this.activatedRouter.params.subscribe(params => {
      this.articleService.getRelatedArticle(params['url'])
        .subscribe((data: ArticleType[]) => {
          this.relatedArticle = data;
        })
    })
  }

  getAuthService(): AuthService {
    return this.authService;
  }

  toggleAction(commentId: string, action: 'like' | 'dislike') {
    if (!this.getAuthService().getIsLoggedIn()) {
      this._snackBar.open('Чтобы поставить реакцию нужно войти или зарегистрироваться');
      return;
    }

    if (this.comments) {
      const comment: CommentType | undefined = this.comments.find(comment => comment.id === commentId);

      if (comment) {
        let postAction: 'like' | 'dislike' = action;

        if (action === 'like') {
          postAction = comment.isLiked ? 'dislike' : 'like';
        } else if (action === 'dislike') {
          postAction = comment.isDisliked ? 'like' : 'dislike';
        }

        this.articleService.postAction(commentId, postAction).subscribe((data: DefaultResponseType) => {
          if (!data.error) {
            if (action === 'like' || action === 'dislike') {
              let showSnackBar = true;
              if (action === 'like') {
                comment.isLiked = !comment.isLiked;
                if (comment.isLiked) {
                  comment.isDisliked = false;
                }
                comment.likesCount += comment.isLiked ? 1 : -1;
              } else if (action === 'dislike') {
                comment.isDisliked = !comment.isDisliked;
                if (comment.isDisliked) {
                  comment.isLiked = false;
                }
              }
              if (!comment.isLiked && !comment.isDisliked) {
                showSnackBar = false;
              }
              if (showSnackBar) {
                this._snackBar.open('Ваш голос учтен');
              }
            }
          }
        });
      }
    }
  }

  reportViolation(commentId: string) {
    if (!this.getAuthService().getIsLoggedIn()) {
      this._snackBar.open('Для данного действия необходимо авторизоваться');
      return;
    }

    this.articleService.postAction(commentId, 'violate')
      .pipe(
        catchError((error: HttpErrorResponse): Observable<any> => {
          if (error.status === 400) {
            this._snackBar.open('Жалоба уже отправлена');
          }
          return throwError(error);
        })
      )
      .subscribe((data: DefaultResponseType) => {
        if (!data.error) {
          this._snackBar.open('Жалоба отправлена');
        }
      });
  }


  addComment(id: string) {
    this.articleService.postComment(id, this.commentField)
      .subscribe((data: DefaultResponseType) => {
        if (data.error) {
          throw new Error(data.message);
        }
        window.location.reload();
      })
  }

  uploadMoreComments() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.article && this.comments) {
        this.articleService.getComments(this.article.id, { offset: this.comments.length, article: this.article.id })
          .subscribe((comments: { allCount: number, comments: CommentType[] }) => {
            if (this.comments) {
              this.comments = this.comments.concat(comments.comments);
              this.isMoreComments = this.comments.length < comments.allCount;
              this.checkAndSetIsActionsStatus(this.comments);
            }
            this.isLoading = false;
          })
      }
    }, 1000)
  }

  checkAndSetIsActionsStatus(comments: CommentType[]): void {
    comments.forEach(comment => {
      this.articleService.getActions(comment.id)
        .subscribe((actions: ActionType[] | DefaultResponseType) => {
          if ((actions as DefaultResponseType).error) {
            throw new Error((actions as DefaultResponseType).message);
          }
          if (Array.isArray(actions)) {
            const [action] = actions;
            comment.isLiked = action?.action === 'like';
            comment.isDisliked = action?.action === 'dislike';
          }

        });
    });
  }
}
