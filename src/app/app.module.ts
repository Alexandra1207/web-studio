import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { MainComponent } from './views/main/main.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {SharedModule} from "./shared/shared.module";
import {CarouselModule} from "ngx-owl-carousel-o";
// import {SlickCarouselModule} from 'ngx-slick-carousel';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthInterceptor} from "./core/auth/auth.interceptor";
// import {RouterModule} from "@angular/router";
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from "@angular/material/dialog";
import {RequestService} from "./shared/services/request.service";
import { PrivacyPolicyComponent } from './views/docs/privacy-policy/privacy-policy.component';




@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PrivacyPolicyComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CarouselModule,
    MatSelectModule,
    MatDialogModule,
    // SlickCarouselModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
