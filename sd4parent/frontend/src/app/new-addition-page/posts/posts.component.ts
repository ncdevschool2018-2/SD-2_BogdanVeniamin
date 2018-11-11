import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/internal/Subscription"
import { Post } from "../../model/post";
import { PostService } from "../../service/post.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts: Post[];
  private subscriptions: Subscription[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts(): void {
    this.subscriptions.push(this.postService.getPosts().subscribe( products => {
      this.posts = products as Post[];
      console.log(this.posts);
    } ))
  }

}
