import { AccountService } from './../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'app/models/blog/blog.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userBlogs: Blog[]
  constructor(
    private blogService: BlogService,
    private router:Router,
    private toastr:ToastrService,
    private accountService:AccountService
  ) { }

  ngOnInit(): void {
    this.userBlogs=[];

    let currentApplicationUserId = this.accountService.currentUserValue.applicationUserId;
    this.blogService.getByApplicationUserId(currentApplicationUserId)
    .subscribe(userBlogs =>{
      this.userBlogs=userBlogs;
    });
  }

  confirmDelete(blog: Blog){
    blog.deleteConfirm=true;
  }
  cancelDeleteConfirm(blog:Blog){
    blog.deleteConfirm=false;
  }

  deleteConfirmed(blog:Blog,blogs: Blog[]){
    this.blogService.delete(blog.blogId).subscribe(()=>{
      let index=0;
      for(let i=0;i<blogs.length;i++){
        if(blogs[i].blogId===blog.blogId){
          index=i;
        }
      }
      if(index > -1){
        blogs.splice(index,1);
      }
      this.toastr.info("Blog deleted");
    });
  }

  editBlog(blogId: number) {
    this.router.navigate([`/dashboard/${blogId}`]);
  }

  createBlog(){
    this.router.navigate([`dashboard/-1`]);
  }


}
