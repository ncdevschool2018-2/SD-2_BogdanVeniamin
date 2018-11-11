import { Component, OnInit } from '@angular/core';
import { Post } from "../../model/post"
import { PostService } from "../../service/post.service"
import { Subscription } from "rxjs/internal/Subscription"
import { NgxSpinnerService } from 'ngx-spinner';
import {SessionStorageService} from 'ngx-webstorage';
import {User} from "../../model/user";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  public posts: Post[];
  private subscriptions: Subscription[] = [];

  constructor(private postService: PostService, private loadingService: NgxSpinnerService, private sessionSt: SessionStorageService) { }

  ngOnInit() {
    this.loadPosts(this.getSessionStorage().login);
  }

  private loadPosts(login: string): void {
    this.loadingService.show();
    this.subscriptions.push(this.postService.getPostsByLogin(login).subscribe(products => {
      this.posts = products as Post[];
      console.log(this.posts);
      this.loadingService.hide();
    }))
  }

  public _shortDescription(description: string): string {
    let point: number;
    description = description.slice(0,792);
    if(description.length === 220) {
      for(let j: number = 0; j<description.length; j++) {
        if(description[j] === '.')
          point = j+1;
      }
    }
    return description.slice(0,point);
  }

  private getSessionStorage(): User {
    return this.sessionSt.retrieve("logged-in");
  }

}
