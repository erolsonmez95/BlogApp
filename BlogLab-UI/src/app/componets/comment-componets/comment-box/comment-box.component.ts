import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlogCommentCreate } from 'app/models/blog-comment/blog-comment-create.model';
import { BlogCommentViewModel } from 'app/models/blog-comment/blog-comment-viewmodel.model';
import { BlogComment } from 'app/models/blog-comment/blog-comment.model';
import { BlogCommentService } from 'app/services/blog-comment.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {

  @Input() comment: BlogCommentViewModel;
  @Output() commentSaved = new EventEmitter<BlogComment>();

  @ViewChild('commentForm') commentForm: NgForm;

  constructor(
    private blogCommentService: BlogCommentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  resetComment() {
    this.commentForm.reset();
  }

  onSubmit() {

    let blogCommentCreate: BlogCommentCreate = {
      blogCommentId: this.comment.blogCommentId,
      parentBlogCommentId: this.comment.parentBlogCommentId,
      blogId: this.comment.blogId,
      content: this.comment.content
    };

    this.blogCommentService.create(blogCommentCreate).subscribe(blogComment => {
      this.toastr.info("Comment saved.");
      this.resetComment();
      this.commentSaved.emit(blogComment);
    })
  }
}
