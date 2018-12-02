import { Component, OnInit } from '@angular/core';
import { Post } from "../../model/post"
import { PostService } from "../../service/post.service"
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
  public pages: number[] = [];
  public total: number;
  public currentPage: number = 1;

  constructor(private postService: PostService, private loadingService: NgxSpinnerService) { }

  ngOnInit() {
    this.getPostsByPage(1);
    this.getTotalPages();
  }

  private loadPosts(): void {
    this.loadingService.show();
    this.subscriptions.push(this.postService.getPosts().subscribe(products => {
      this.posts = products as Post[];
      console.log(this.posts);
      this.loadingService.hide();
    }))
  }

  private getTotalPages(): void {
    this.subscriptions.push(this.postService.getTotalPages().subscribe(totalPages => {
      this.total = totalPages;
      console.log(this.total);
      for(let i=1; i<=totalPages; i++) {
        this.pages.push(i);
      }
    }))
  }

  public getPostsByPage(page: number): void {
    this.subscriptions.push(this.postService.getPostsByPage(page).subscribe(products => {
      this.posts = products as Post[];
    }))
  }

  public _shortDescription(description: string): string {
    let point: number;
    description = description.slice(0,220);
    if(description.length === 220) {
      for(let j: number = 0; j<description.length; j++) {
        if(description[j] === '.')
          point = j+1;
      }
    }
    return description.slice(0,point);
  }
}
