import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ArticleCardComponent} from "./components/article-card/article-card.component";
import { CutTextPipe } from './pipes/cut-text.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { RequestModalComponent } from './components/request-modal/request-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMaskDirective, NgxMaskPipe} from "ngx-mask";




@NgModule({
  declarations: [ArticleCardComponent, CutTextPipe, FormatDatePipe, RequestModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    RouterModule
  ],
  exports: [ArticleCardComponent, FormatDatePipe],
})
export class SharedModule { }
