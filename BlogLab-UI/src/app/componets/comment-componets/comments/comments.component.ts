import { Component, Input, OnInit } from '@angular/core';
import { BlogCommentViewModel } from 'app/models/blog-comment/blog-comment-viewmodel.model';
import { BlogComment } from 'app/models/blog-comment/blog-comment.model';
import { AccountService } from 'app/services/account.service';
import { BlogCommentService } from 'app/services/blog-comment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comments: BlogCommentViewModel[];

  constructor(
    public accountService: AccountService,
    private toastr: ToastrService,
    private blogCommentService: BlogCommentService
  ) { }

  ngOnInit(): void {
  }

  editComment(comment: BlogCommentViewModel) {
    comment.isEditable = true;
  }

  showDeleteConfirm(comment: BlogCommentViewModel) {
    comment.deleteConfirm = true;
  }

  cancelDeleteConfirm(comment: BlogCommentViewModel) {
    comment.deleteConfirm = false;
  }

  deleteConfirm(comment: BlogCommentViewModel, comments: BlogCommentViewModel[]) {
    this.blogCommentService.delete(comment.blogCommentId).subscribe(() => {

      let index = 0;

      for(let i=0; i<comments.length; i++) {
        if (comments[i].blogCommentId === comment.blogCommentId) {
          index = i;
        }
      }

      if (index > -1) {
        comments.splice(index, 1);
      }

      this.toastr.info("Blog comment deleted.");
    });
  }

  replyComment(comment: BlogCommentViewModel) {
    let replyComment: BlogCommentViewModel = {
      parentBlogCommentId: comment.blogCommentId,
      content: '',
      blogId: comment.blogId,
      blogCommentId: -1,
      username: this.accountService.currentUserValue.username,
      publishDate: new Date(),
      updateDate: new Date(),
      isEditable: false,
      deleteConfirm: false,
      isReplying: true,
      comments: []
    };

    comment.comments.push(replyComment);
  }

  onCommentSaved(blogComment: BlogComment, comment: BlogCommentViewModel) {
    comment.blogCommentId = blogComment.blogCommentId;
    comment.parentBlogCommentId = blogComment.parentBlogCommentId;
    comment.blogId = blogComment.blogId;
    comment.content = blogComment.content;
    comment.publishDate = blogComment.publishDate;
    comment.updateDate = blogComment.updateDate;
    comment.username = blogComment.username;
    comment.isEditable = false;
    comment.isReplying = false;
  }
}
