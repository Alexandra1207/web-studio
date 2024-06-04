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
            console.log(this.activeParams);
            this.articleService.getArticles(this.activeParams)
              .subscribe(data => {
                this.pages = [];
                for (let i = 1; i <= data.pages; i++) {
                  this.pages.push(i);
                }
                if (this.pages.length > 1 && !params['page']) {
                  this.activeParams.page = 1;

                  this.router.navigate(['/catalog'], {
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

    console.log(this.activeParams);
    if (this.activeParams.categories && this.activeParams.categories.length > 0) {

      if (this.activeParams.categories) {
        const existingCategoryInParam = (Array.isArray(this.activeParams.categories) ? this.activeParams.categories : [this.activeParams.categories]).find(item => item === url);
        // const existingCategoryInParam = this.activeParams.categories.find(item => item === url);

        console.log(existingCategoryInParam);
        if (existingCategoryInParam) {
          this.activeParams.categories = (Array.isArray(this.activeParams.categories) ? this.activeParams.categories : [this.activeParams.categories]).filter(item => item !== url);
        } else if (!existingCategoryInParam) {
          // this.activeParams.categories.push(url);
          this.activeParams.categories = [...this.activeParams.categories, url];
        }
      }
    } else {
      this.activeParams.categories = [url];
    }
    //
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

  // @HostListener('document:click', ['$event'])
  // clickOutside(event: Event) {
  //   if (!this.elementRef.nativeElement.contains(event.target)) {
  //     this.openFilter = false;
  //   }
  // }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (event.target && !!(event.target as HTMLElement).closest('.blog-filter')) {
      return;
    }
    this.openFilter = false;
  }
}


// ngOnInit() {
//   if (this.pages.length > 1) {
//     this.activeParams.page = 1;
//
//     this.router.navigate(['/blog'], {
//       queryParams: this.activeParams
//     })
//   }
//
//
//   this.categoryService.getCategories()
//     .subscribe(data => {
//       this.categories = data;
//       console.log(this.categories);
//
//       this.activatedRouter.queryParams
//         .pipe(
//           debounceTime(500)
//         )
//         .subscribe(params => {
//
//           // this.activeParams = ActiveParamsUtil.processParams(params);
//           // const activeParams: ActiveParamsType = {types: []};
//           // this.activeParams.categories = params['categories'];
//           if (params.hasOwnProperty('categories')) {
//             this.activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
//             console.log(this.activeParams.categories);
//           }
//           if (params.hasOwnProperty('page')) {
//             this.activeParams.page = +params['page'];
//             console.log(this.activeParams.page);
//           }
//
//           console.log(this.activeParams);
//
//
//           // this.appliedFilters = [];
//
//           //////
//
//           // this.appliedFilters = [];
//           this.appliedFilters = this.categories.filter(category => this.activeParams.categories.includes(category.url));
//
//           // this.activeParams.categories.forEach(url => {
//           //   // for (let i = 0; i < this.categories.length; i++) {
//           //     const foundCategory = this.categories.find(category => category.url === url);
//           //     if (foundCategory) {
//           //       this.appliedFilters.push({
//           //         name: foundCategory.name,
//           //         url: foundCategory.url
//           //       });
//           //     }
//           //   // }
//           // });
//           //
//           // if (this.activeParams.heightFrom) {
//           //   this.appliedFilters.push({
//           //     name: 'Высота: от ' + this.activeParams.heightFrom + ' см',
//           //     urlParam: 'heightFrom'
//           //   });
//           // }
//           // if (this.activeParams.heightTo) {
//           //   this.appliedFilters.push({
//           //     name: 'Высота: до ' + this.activeParams.heightTo + ' см',
//           //     urlParam: 'heightTo'
//           //   });
//           // }
//           // if (this.activeParams.diameterFrom) {
//           //   this.appliedFilters.push({
//           //     name: 'Диаметр: от ' + this.activeParams.diameterFrom + ' см',
//           //     urlParam: 'diameterFrom'
//           //   });
//           // }
//           // if (this.activeParams.diameterTo) {
//           //   this.appliedFilters.push({
//           //     name: 'Диаметр: до ' + this.activeParams.diameterTo + ' см',
//           //     urlParam: 'diameterTo'
//           //   });
//           // }
//           // this.productService.getProducts(this.activeParams)
//           //   .subscribe(data => {
//           //     this.pages = [];
//           //     for (let i = 1; i <= data.pages; i++) {
//           //       this.pages.push(i);
//           //     }
//
//           ///////////////////
//           // if (this.pages.length > 1 && !params['page']) {
//           //   this.activeParams.page = 1;
//           //
//           //   this.router.navigate(['/catalog'], {
//           //     queryParams: this.activeParams
//           //   })
//           // }
//           /////////////////
//           // if (this.cart && this.cart.items.length > 0) {
//           //
//           //   this.products = data.items.map(product => {
//           //     if (this.cart) {
//           //       const productInCart = this.cart.items.find(item => item.product.id === product.id)
//           //       if (productInCart) {
//           //         product.countInCart = productInCart.quantity;
//           //       }
//           //     }
//           //     return product;
//           //   })
//           //
//           // } else {
//           //   this.products = data.items;
//           // }
//
//           // if (this.favoriteProducts) {
//           //   this.products = this.products.map(product => {
//           //     const productInFavorite = this.favoriteProducts?.find(item => item.id === product.id);
//           //     if (productInFavorite) {
//           //       product.isInFavorite = true;
//           //     }
//           //     return product;
//           //   })
//           // }
//         });
//     })
//   // })
// ////////////////////////////
//   // this.categoryService.getCategories()
//   //   .subscribe((data: CategoryType[]) => {
//   //     this.categories = data;
//   //
//   //     this.activatedRouter.queryParams
//   //       .pipe(
//   //         debounceTime(500)
//   //       )
//   //       .subscribe(params => {
//   //       if (params['categories']) {
//   //
//   //         this.activeParams.categories = params['categories'];
//   //
//   //         console.log(this.activeParams);
//   //         console.log(this.categories);
//   //       }
//   //
//   //       this.appliedFilters = this.categories.filter(category => this.activeParams.categories.includes(category.url));
//   //       console.log(this.appliedFilters);
//   //
//
//   // if (this.pages.length > 1) {
//   this.activeParams.page = 2;
//
//   // this.router.navigate(['/catalog'], {
//   //   queryParams: this.activeParams
//   // })
//   // }
//   this.articleService.getArticles({categories: [], page: 2})
//     .subscribe(data => {
//       this.articles = data.items;
//       console.log(this.articles);
//     });
//
//   console.log({categories: [], page: 2});
//   console.log(this.activeParams);
//   this.articleService.getArticles(this.activeParams)
//     .subscribe(data => {
//       this.pages = [];
//       for (let i = 1; i <= data.pages; i++) {
//         this.pages.push(i);
//       }
//       //
//       // if (this.pages.length > 1 && !params['page']) {
//       //   this.activeParams.page = 1;
//       //
//       //   this.router.navigate(['/catalog'], {
//       //     queryParams: this.activeParams
//       //   })
//       // }
//       this.articles = data.items;
//       console.log(this.articles);
//     });
//   //
//   //     })
//   //   })
//
//
//   ////////////////////////////////////////////
//
//
//   // if (this.pages.length > 1 && !params['page']) {
//   //   this.activeParams.page = 1;
//   //
//   //   this.router.navigate(['/catalog'], {
//   //     queryParams: this.activeParams
//   //   })
//   // }
//
//   // if (!this.activeParams.page) {
//   //   this.activeParams.page = 1;
//   // }
//
//   // this.articleService.getArticles()
//   //   .subscribe(data => {
//   //     this.pages = [];
//   //     for (let i = 1; i <= data.pages; i++) {
//   //       this.pages.push(i);
//   //     }
//   //     this.articles = data.items;
//   //     console.log(this.pages);
//   //   });
//
// }
