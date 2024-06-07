import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryType} from "../../../../types/category.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {

  articles: ArticleType[] = [];
  categories: CategoryType[] = [];
  openFilter = false;
  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: CategoryType[] = [];
  pages: number[] = [];


  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private router: Router,
              private elementRef: ElementRef,
              private activatedRouter: ActivatedRoute) {

  }

  ngOnInit() {
    if (this.pages.length > 1) {
      this.activeParams.page = 1;

      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      })
    }

    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data;

        this.activatedRouter.queryParams
          .pipe(
            debounceTime(500)
          )
          .subscribe(params => {

            if (params.hasOwnProperty('categories')) {
              this.activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
            }
            if (params.hasOwnProperty('page')) {
              this.activeParams.page = +params['page'];
            }

            this.appliedFilters = this.categories.filter(category => this.activeParams.categories.includes(category.url));
            this.articleService.getArticles(this.activeParams)
              .subscribe(data => {
                this.pages = [];
                for (let i = 1; i <= data.pages; i++) {
                  this.pages.push(i);
                }
                if (this.pages.length > 1 && !params['page']) {
                  this.activeParams.page = 1;

                  this.router.navigate(['/blog'], {
                    queryParams: this.activeParams
                  })
                }
                this.articles = data.items;
              });
          });
      })
  }

  toggleFilterBlock() {
    this.openFilter = !this.openFilter;
  }

  updateFilterParam(url: string) {

    if (this.activeParams.categories && this.activeParams.categories.length > 0) {

      if (this.activeParams.categories) {
        const existingCategoryInParam = (Array.isArray(this.activeParams.categories) ? this.activeParams.categories : [this.activeParams.categories]).find(item => item === url);

        if (existingCategoryInParam) {
          this.activeParams.categories = (Array.isArray(this.activeParams.categories) ? this.activeParams.categories : [this.activeParams.categories]).filter(item => item !== url);
        } else if (!existingCategoryInParam) {
          this.activeParams.categories = [...this.activeParams.categories, url];
        }
      }
    } else {
      this.activeParams.categories = [url];
    }
    this.appliedFilters = this.categories.filter(category => this.activeParams.categories.includes(category.url));
    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })
  }

  removeAppliedFilter(appliedFilter: CategoryType) {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.url);
    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      })
    }

  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      })
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (event.target && !!(event.target as HTMLElement).closest('.blog-filter')) {
      return;
    }
    this.openFilter = false;
  }
}


