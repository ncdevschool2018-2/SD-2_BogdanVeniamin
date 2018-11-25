import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription'
import { NgxSpinnerService } from 'ngx-spinner';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

import { UserService } from "../../service/user.service";
import { User } from "../../model/user";
import { Transaction } from "../../model/transaction";
import { TransactionService } from "../../service/transaction.service";
import {Wallet} from "../../model/wallet";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  public user: User;
  public  amount: number;
  private subscriptions: Subscription[] = [];
  public modalRef: BsModalRef;
  private transaction: Transaction = new Transaction();

  constructor(private transactionService: TransactionService, private userService: UserService,
              private loadingService: NgxSpinnerService, private modalService: BsModalService,
              private authService: AuthService) { }

  ngOnInit() {
    this.loadWallet(this.authService.getUsername());
  }

  private loadWallet(login: string) {
    this.loadingService.show();
    this.subscriptions.push(this.userService.getUserByLogin(login).subscribe(account => {
      this.user = account as User;
      console.log("Wallet: " + this.user.wallet.money);
      this.loadingService.hide();
    }))
  }

  public _openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private closeModal(): void {
    this.modalRef.hide();
  }

  private createTransaction(): Transaction {
    this.transaction.title = "Fill Up";
    this.transaction.amount = this.amount;
    this.transaction.action = "PLUS";
    this.transaction.wallet = this.user.wallet;
    return this.transaction;
  }

  public _fillUp(): void {
    this.user.wallet.money += +this.amount;
    console.log("Wal " + this.user.wallet.money);
    this.subscriptions.push(this.userService.saveUser(this.user).subscribe(() => {
      console.log("Wallet: " + this.user.wallet.money);
    }));

    this.subscriptions.push(this.transactionService.saveTransaction(this.createTransaction()).subscribe(() => {

    }));

    this.closeModal();
  }

}
