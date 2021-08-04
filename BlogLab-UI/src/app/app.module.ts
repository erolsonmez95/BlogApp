import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown'
import {CollapseModule} from 'ngx-bootstrap/collapse'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {ToastrModule} from 'ngx-toastr'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SummaryPipe } from './pipes/summary.pipe';
import { BlogComponent } from './componets/blog-components/blog/blog.component';
import { BlogCardComponent } from './componets/blog-components/blog-card/blog-card.component';
import { BlogEditComponent } from './componets/blog-components/blog-edit/blog-edit.component';
import { BlogsComponent } from './componets/blog-components/blogs/blogs.component';
import { FamousBlogsComponent } from './componets/blog-components/famous-blogs/famous-blogs.component';
import { CommentBoxComponent } from './componets/comment-componets/comment-box/comment-box.component';
import { CommentSystemComponent } from './componets/comment-componets/comment-system/comment-system.component';
import { CommentsComponent } from './componets/comment-componets/comments/comments.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { HomeComponent } from './componets/home/home.component';
import { LoginComponent } from './componets/login/login.component';
import { NotFoundComponent } from './componets/not-found/not-found.component';
import { NavbarComponent } from './componets/navbar/navbar.component';
import { PhotoAlbumComponent } from './componets/photo-album/photo-album.component';
import { RegisterComponent } from './componets/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    SummaryPipe,
    BlogComponent,
    BlogCardComponent,
    BlogEditComponent,
    BlogsComponent,
    FamousBlogsComponent,
    CommentBoxComponent,
    CommentSystemComponent,
    CommentsComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    NavbarComponent,
    PhotoAlbumComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
