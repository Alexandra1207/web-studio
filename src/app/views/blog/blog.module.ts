import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './article/article.component';
import {SharedModule} from "../../shared/shared.module";
import {FormGroup, FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BlogComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
