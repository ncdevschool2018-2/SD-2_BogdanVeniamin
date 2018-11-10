import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Post} from "../../model/post";
import {Subscription} from "rxjs";
import {PostService} from "../../service/post.service";
import {ActivatedRoute} from "@angular/router"
import {NgxSpinnerService} from "ngx-spinner";

interface Condition {
  price: number;
  discount: number;
  duration: number;
}

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})

export class SubscribeComponent implements OnInit {

  public modalRef: BsModalRef;
  public post: Post;
  private subscriptions: Subscription[] = [];
  private post_id: number;
  public numbers: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  public condition: Condition = new class implements Condition {
    discount: number;
    duration: number;
    price: number;
  };
  isClassVisible = false;

  constructor(private modalService: BsModalService, private route: ActivatedRoute, private postService: PostService, private loadingService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.post_id = +params.get('id');
    });
    this.loadPost(this.post_id.toString());
    this._setDuration(6);
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

  public _closeModal(): void {
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

}
