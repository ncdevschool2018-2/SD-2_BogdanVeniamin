import { Component, OnInit } from '@angular/core';
import { SubscriptionPost } from "../../model/subscription";
import { SubscriptionService } from "../../service/subscription.service";
import { Subscription } from "rxjs/internal/Subscription"
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from "../../service/auth.service";
import {SubscriptionDate} from "../../model/subscriptionDate";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  public subscriptionPosts: SubscriptionPost[];
  private subscriptions: Subscription[] = [];
  public left: number[] = [];

  constructor(private subscriptionService: SubscriptionService, private loadingService: NgxSpinnerService,
              private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.getUsername() != null)
      this.loadPosts(this.authService.getUsername());
  }

  private loadPosts(login: string): void {
    this.loadingService.show();
    this.subscriptions.push(this.subscriptionService.getSubscriptionsByLogin(login).subscribe(subs => {
      this.subscriptionPosts = subs as SubscriptionPost[];
      console.log("Sub: " + this.subscriptionPosts);
      console.log("Sub: " + this.subscriptionPosts[0].duration)
      this.loadingService.hide();
    }))
  }

  public cancelSubscription(subscriptionId: string): void {
    this.loadingService.show();
    this.subscriptions.push(this.subscriptionService.deleteSubscription(subscriptionId).subscribe(() => {
      this.updateSubscriptions();
    }))
  }

  private updateSubscriptions(): void {
    this.loadPosts(this.authService.getUsername());
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

}
