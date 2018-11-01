import { Component, OnInit } from '@angular/core';
import {Post} from "../model/post";
import {Subscription} from "rxjs";
import {PostService} from "../service/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  public posts: Post[];
  private subscriptions: Subscription[] = [];
  public post_id: number;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadPosts();
    this.route.paramMap.subscribe(params => {
      this.post_id = +params.get('id');
    })
  }

  private loadPosts(): void {
    this.subscriptions.push(this.postService.getPosts().subscribe(products => {
      this.posts = products as Post[];
      console.log(this.posts)
    }))
  }

}
