import { Component, OnInit } from '@angular/core';
import { Post } from "../../model/post"
import { PostService } from "../../service/post.service"
import { Subscription } from "rxjs/internal/Subscription"
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {


  private subscriptions: Subscription[] = [];
  public newPost: Post = new Post();

  constructor(private postService: PostService, private loadingService: NgxSpinnerService) { }

  ngOnInit() {
  }

  public _addPost(): void {
    this.loadingService.show();
    this.subscriptions.push(this.postService.savePost(this.newPost).subscribe(() => {
      this.loadingService.hide();
    }))
  }

}
