import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Subscription} from "rxjs";
import {PostService} from "../../service/post.service";
import {ActivatedRoute} from "@angular/router"
import {NgxSpinnerService} from "ngx-spinner";

import { SubscribeCondition } from "../../model/subscribeCondition";
import {Post} from "../../model/post";
import { SubscriptionPost } from "../../model/subscription";
import { TransactionService } from "../../service/transaction.service";
import { SubscriptionService } from "../../service/subscription.service";
import { UserService } from "../../service/user.service";
import { User } from "../../model/user";
import { AuthService } from "../../service/auth.service";


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})

export class SubscribeComponent implements OnInit {

  public modalRef: BsModalRef;
  public post: Post;
  private user: User;
  private subscriptionPost: SubscriptionPost = new SubscriptionPost();
  private subscriptions: Subscription[] = [];
  private post_id: string;
  public numbers: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  public resultCondition: SubscribeCondition;

  constructor(private userService: UserService,private modalService: BsModalService,
              private route: ActivatedRoute, private postService: PostService,
              private loadingService: NgxSpinnerService, private transactionService: TransactionService,
              private subscriptionService: SubscriptionService, private authService: AuthService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.post_id = params.get('id');
    });
    this.loadPost(this.post_id);
    if(this.authService.getUsername() != null)
      this.getUser();
  }

  private loadPost(postId: string): void {
    this.loadingService.show();
    this.subscriptions.push(this.postService.getPost(postId).subscribe(product => {
      this.post = product as Post;
      this._computePrice(6, this.post.discount, this.post.price);
      this.loadingService.hide();
    }))
  }

  private closeModal(): void {
    this.modalRef.hide();
  }

  public _openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public _computePrice(duration, discount, price): void {
    let currentCondition = new SubscribeCondition();
    currentCondition.price = price;
    currentCondition.discount = discount;
    currentCondition.duration = duration;

    this.subscriptions.push(this.subscriptionService.computePrice(currentCondition).subscribe( result => {
      this.resultCondition = result as SubscribeCondition;
    } ))
  }

  public fixedNum(num: number): string {
    if(!num.toString().includes('.'))
      return num.toString();
    let fractionLength: number = num.toString().split('.')[1].length;
    if(fractionLength >= 2)
      return num.toFixed(2);
    return num.toFixed(fractionLength);

  }

  private getUser(): void {
    this.subscriptions.push(this.userService.getUserByLogin(this.authService.getUsername()).subscribe(account => {
      this.user = account as User;
    }))
  }

  private createSubscription(): SubscriptionPost {
    this.subscriptionPost.user = this.user;
    this.subscriptionPost.post = this.post;
    this.subscriptionPost.duration = this.resultCondition.duration;
    this.subscriptionPost.cost = this.post.price;
    console.log("Sub:" + this.subscriptionPost.cost);
    return this.subscriptionPost;
  }

  public _subscribe(): void {

    this.subscriptions.push(this.subscriptionService.saveSubscription(this.createSubscription()).subscribe(() => {
      console.log("Subscription: " + this.subscriptionPost);
      this.closeModal();
    }));

  }

}
