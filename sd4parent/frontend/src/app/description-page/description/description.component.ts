import { Component, OnInit } from '@angular/core';
import {Post} from "../../model/post";
import {Subscription} from "rxjs";
import {PostService} from "../../service/post.service";
import {ActivatedRoute} from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  public posts: Post[];
  private subscriptions: Subscription[] = [];
  private post_id: number;
  public index: number;

  constructor(private postService: PostService, private route: ActivatedRoute, private loadingService: NgxSpinnerService) { }

  ngOnInit() {
    this.loadPosts();
    this.route.paramMap.subscribe(params => {
      this.post_id = +params.get('id');
    });
    console.log("Index: " + this.index);
  }

  private loadPosts(): void {
    this.loadingService.show();
    this.subscriptions.push(this.postService.getPosts().subscribe(products => {
      this.posts = products as Post[];
      console.log(this.posts);
      this.findPost();
      this.loadingService.hide();
    }))
  }

  private findPost(): void {
    for(let i: number = 0; i<this.posts.length; i++)
      if(+this.posts[i].id === this.post_id)
        this.index = i;
  }

  public _deletePost(userId: string): void {
    this.loadingService.show();
    this.subscriptions.push(this.postService.deletePost(userId).subscribe(() => {
    }))
  }
}
