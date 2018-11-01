import { Component, OnInit } from '@angular/core';
import { Post } from "../model/post"
import { PostService } from "../service/post.service"
import { Subscription } from "rxjs/internal/Subscription"
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts: Post[];
  private subscriptions: Subscription[] = [];

  constructor(private postService: PostService, private loadingService: NgxSpinnerService) { }

  ngOnInit() {
    this.loadPosts()
  }

  private loadPosts(): void {
    this.loadingService.show();
    this.subscriptions.push(this.postService.getPosts().subscribe(products => {
      this.posts = products as Post[]
      console.log(this.posts)
      this.loadingService.hide();
    }))
  }

}
