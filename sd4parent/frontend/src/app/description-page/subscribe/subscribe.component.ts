import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Subscription} from "rxjs";
import {PostService} from "../../service/post.service";
import {ActivatedRoute} from "@angular/router"
import {NgxSpinnerService} from "ngx-spinner";

import { subscribeCondition } from "../../model/subscribeCondition";
import {Post} from "../../model/post";
import { Transaction } from "../../model/transaction";
import { SubscriptionPost } from "../../model/subscription";
import { TransactionService } from "../../service/transaction.service";
import { SubscriptionService } from "../../service/subscription.service";
import { Wallet } from "../../model/wallet";
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
  private wallet: Wallet;
  private transaction: Transaction = new Transaction();
  private subscriptionPost: SubscriptionPost = new SubscriptionPost();
  private subscriptions: Subscription[] = [];
  private post_id: number;
  public numbers: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  public condition: subscribeCondition = new subscribeCondition();

  constructor(private userService: UserService,private modalService: BsModalService,
              private route: ActivatedRoute, private postService: PostService,
              private loadingService: NgxSpinnerService, private transactionService: TransactionService,
              private subscriptionService: SubscriptionService, private authService: AuthService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.post_id = +params.get('id');
    });
    this.loadPost(this.post_id.toString());
    this._setDuration(6);
    this.getUser();
  }

  private loadPost(postId: string): void {
    this.loadingService.show();
    this.subscriptions.push(this.postService.getPost(postId).subscribe(product => {
      this.post = product as Post;
      this._setPrice(this.post.price, this.post.discount);
      this._setDiscount(this.post.discount);
      this.loadingService.hide();
    }))
  }

  private closeModal(): void {
    this.modalRef.hide();
  }

  public _openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public _setDuration(duration: number): void {
    this.condition.duration = duration;
  }

  public _setPrice(price: number, discount: number): void {
    this.condition.price = parseFloat(this._computePrice(price, discount));
  }

  public _setDiscount(discount: number): void {
    this.condition.discount = parseFloat(this._computeDiscount(discount));
  }

  private _computePrice(price: number, discount: number) {
    return (price*this.condition.duration - price*this.condition.duration*this._discount(discount)/100).toFixed(2);
  }

  private _discount(discount) {
    if(this.condition.duration > 0 && this.condition.duration < 4)
      return 0;
    if(this.condition.duration > 3 && this.condition.duration < 7)
      return discount/3;
    if(this.condition.duration > 6 && this.condition.duration < 10)
      return 2*discount/3;
    if(this.condition.duration > 9 && this.condition.duration < 13)
      return discount;
  }

  private _computeDiscount(discount) {
    if(this.condition.duration > 0 && this.condition.duration < 4)
      return 0;
    if(this.condition.duration > 3 && this.condition.duration < 7)
      return (discount/3).toFixed(2);
    if(this.condition.duration > 6 && this.condition.duration < 10)
      return (2*discount/3).toFixed(2);
    if(this.condition.duration > 9 && this.condition.duration < 13)
      return discount.toFixed(2);
  }

  private getUser(): void {
    this.subscriptions.push(this.userService.getUserByLogin(this.authService.getUsername()).subscribe(account => {
      this.user = account as User;
    }))
  }

  private createTransaction(): Transaction {

    this.transaction.wallet = this.user.wallet;
    this.transaction.action = "MINUS";
    this.transaction.amount = this.condition.price;
    this.transaction.title = this.post.title;
    return this.transaction;
  }

  private createSubscription(): SubscriptionPost {
    this.subscriptionPost.user = this.user;
    this.subscriptionPost.post = this.post;
    this.subscriptionPost.duration = this.condition.duration;
    console.log("Sub:" + this.subscriptionPost);
    return this.subscriptionPost;
  }

  public _subscribe(): void {

    this.subscriptions.push(this.transactionService.saveTransaction(this.createTransaction()).subscribe(() => {
      console.log("Transaction: " + this.transaction);
    }));

    this.subscriptions.push(this.subscriptionService.saveSubscription(this.createSubscription()).subscribe(() => {
      console.log("Subscription: " + this.subscriptionPost);
      this.closeModal();
    }));

  }

}
