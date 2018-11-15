  import { Component, OnInit } from '@angular/core';
import {Post} from "../../model/post";
import {Subscription} from "rxjs";
import {PostService} from "../../service/post.service";
import {ActivatedRoute} from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import {SessionStorageService} from 'ngx-webstorage';
import {User} from "../../model/user";

@Component({
  selector: 'description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  public post: Post;
  private subscriptions: Subscription[] = [];
  public post_id: number;

  constructor(private postService: PostService, private route: ActivatedRoute, private loadingService: NgxSpinnerService, private sessionSt: SessionStorageService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.post_id = +params.get('id');
    });
    this.loadPost(this.post_id.toString());
  }

  private loadPost(postId: string): void {
    this.loadingService.show();
    this.subscriptions.push(this.postService.getPost(postId).subscribe(product => {
      this.post = product as Post;
      console.log("Post: " + this.post);
      this.loadingService.hide();
    }))
  }

  public _deletePost(userId: string): void {
    this.loadingService.show();
    this.subscriptions.push(this.postService.deletePost(userId).subscribe(() => {
    }))
  }

  public _getSessionStorage(): User {
    return this.sessionSt.retrieve("logged-in");
  }
}
