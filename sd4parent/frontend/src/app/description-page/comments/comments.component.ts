import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router"

import {Comment} from "../../model/comment";
import { CommentService } from "../../service/comment.service";
import { AuthService } from "../../service/auth.service";
import { UserService } from "../../service/user.service";
import { PostService } from "../../service/post.service";
import {User} from "../../model/user";
import {Post} from "../../model/post";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public comments: Comment[];
  private post_id: string;
  private subscriptions: Subscription[] = [];
  public newComment: Comment = new Comment();

  constructor(private commentService: CommentService, private authService: AuthService,
              private route: ActivatedRoute, private userService: UserService,
              private postService: PostService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.post_id = params.get('id');
      this.loadComments(this.post_id);
      if(this.authService.getUsername() != null) {
        this.getUser();
        this.getPost();
      }
    });
  }

  private loadComments(postId: string): void {
    this.subscriptions.push(this.commentService.getCommentsByPostId(postId).subscribe(reviews => {
      this.comments = reviews as Comment[];
    } ))
  }

  private getUser(): void {
    this.subscriptions.push(this.userService.getUserByLogin(this.authService.getUsername()).subscribe(account => {
      this.newComment.user = account as User;
    }))
  }

  private getPost(): void {
    this.subscriptions.push(this.postService.getPost(this.post_id).subscribe(product => {
      this.newComment.post = product as Post;
    }))
  }

  public saveComment(): void {
    console.log("Comment: " + this.newComment.user + " " + this.newComment.post + " " + this.newComment.text);
    this.subscriptions.push(this.commentService.saveComment(this.newComment).subscribe(() => {
      this.loadComments(this.post_id);
    }))
  }

  public deleteComment(commentId: string): void {
    this.subscriptions.push(this.commentService.deleteComment(commentId).subscribe(() => {
      this.loadComments(this.post_id);
    }))
  }

  public checkUser(comment: Comment): boolean {

    if(comment.user.login == this.authService.getUsername() || this.authService.getRole() == "ADMIN")
      return true;
    else
      return false;
  }

}
