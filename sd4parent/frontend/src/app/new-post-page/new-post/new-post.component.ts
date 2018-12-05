import { Component, OnInit } from '@angular/core';
import { Post } from "../../model/post"
import { PostService } from "../../service/post.service"
import { Subscription } from "rxjs/internal/Subscription"
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from "../../service/auth.service";
import {Router} from "@angular/router";
import { LoginEventService } from "../../service/login-event.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {


  private subscriptions: Subscription[] = [];
  public newPost: Post = new Post();

  constructor(private postService: PostService, private loadingService: NgxSpinnerService,
              private authService: AuthService, private router: Router,
              private loginEventService: LoginEventService) { }

  ngOnInit() {
    this.checkUsername();
    this.loginEventService.skipClicked.subscribe( value => {
      if(value == true) {
        this.checkUsername();
      }
    })
  }

  public _addPost(): void {
    this.loadingService.show();
    this.subscriptions.push(this.postService.savePost(this.newPost).subscribe(() => {
      this.loadingService.hide();
    }))
  }

  private checkUsername(): void {
    if(this.authService.getUsername() == null)
      this.router.navigate(['']);
    else if(this.authService.getRole() != "ADMIN")
      this.router.navigate(['']);
  }

}
