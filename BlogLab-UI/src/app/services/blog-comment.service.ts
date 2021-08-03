import { environment } from './../../environments/environment';
import { BlogCommentCreate } from './../models/blog-comment/blog-comment-create.model';
import { BlogComment } from './../models/blog-comment/blog-comment.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogCommentService {

  constructor(
    private http: HttpClient

  ) { }

  create(model: BlogCommentCreate): Observable<BlogComment>{
      return this.http.post<BlogComment>(`${environment.webApi}/BlogComment`,model);
  }

  delete(blogCommentId:number):Observable<number>{
    return this.http.delete<number>(`${environment.webApi}/BlogComment/${blogCommentId}`);
  }

  getAll(blogId: number):Observable<BlogComment[]>{
    return this.http.get<BlogComment[]>(`${environment.webApi}/BlogComment/${blogId}`);

  }
}
