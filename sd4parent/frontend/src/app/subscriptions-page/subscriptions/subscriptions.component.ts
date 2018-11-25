import { Component, OnInit } from '@angular/core';
import { SubscriptionPost } from "../../model/subscription";
import { SubscriptionService } from "../../service/subscription.service";
import { Subscription } from "rxjs/internal/Subscription"
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  public subscriptionPosts: SubscriptionPost[];
  private subscriptions: Subscription[] = [];

  constructor(private subscriptionService: SubscriptionService, private loadingService: NgxSpinnerService,
              private authService: AuthService) { }

  ngOnInit() {
    this.loadPosts(this.authService.getUsername());
  }

  private loadPosts(login: string): void {
    this.loadingService.show();
    this.subscriptions.push(this.subscriptionService.getSubscriptionsByLogin(login).subscribe(subs => {
      this.subscriptionPosts = subs as SubscriptionPost[];
      console.log(this.subscriptionPosts);
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

  private finishDate(date: string, duration: number): string {
    let day: number = +date.substring(5, 2);
    let month: number = +date.substring(8, 2);
    let year: number = +date.substring(0, 4);

    month += duration;
    if(month >= 12) {
      month -= 12;
      year +=1;
    }

    return ("" + year + "-" + day + "-" + month);
  }

  public _leftDays(startDate: string, duration: number): number {
    let date: string = this.finishDate(startDate, duration);

    let current = new Date();

    let currentDay: number = current.getDate();
    let currentMonth: number = current.getMonth() + 1;
    let currentYear: number = current.getFullYear();

    let finishDay: number = +date.substring(5,2);
    let finishMonth: number = +date.substring(8,2);
    let finishYear: number = +date.substring(0,4)

    let leftMonths: number = finishMonth;

    if(finishYear != currentYear) {
      leftMonths += 12 * (finishYear - currentYear);
    }

    leftMonths = leftMonths - currentMonth;

    let leftDays: number = finishDay;

    if(leftMonths != 0){
      leftDays += 30 * leftMonths;
    }

    return (leftDays - currentDay);


  }

}
