import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription'
import { NgxSpinnerService } from 'ngx-spinner';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

import { UserService } from "../../service/user.service";
import { Transaction } from "../../model/transaction";
import { TransactionService } from "../../service/transaction.service";
import { WalletService } from "../../service/wallet.service";
import { MoneyOperation } from "../../model/moneyOperation";
import { AuthService } from "../../service/auth.service";
import {Wallet} from "../../model/wallet";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  public wallet: Wallet;
  public  amount: number;
  private subscriptions: Subscription[] = [];
  public modalRef: BsModalRef;
  private transaction: Transaction = new Transaction();

  constructor(private transactionService: TransactionService, private userService: UserService,
              private loadingService: NgxSpinnerService, private modalService: BsModalService,
              private authService: AuthService, private walletService: WalletService) { }

  ngOnInit() {
    this.loadWallet(this.authService.getUsername());
  }

  private loadWallet(login: string) {
    this.loadingService.show();
    this.subscriptions.push(this.userService.getUserByLogin(login).subscribe(account => {
      this.wallet = account.wallet as Wallet;
      console.log("Wallet: " + this.wallet.money);
      this.loadingService.hide();
    }))
  }

  public _openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private closeModal(): void {
    this.modalRef.hide();
  }

  private updateWallet(): void {
    this.loadWallet(this.authService.getUsername());
  }

  private createTransaction(): Transaction {
    this.transaction.title = "Fill Up";
    this.transaction.amount = this.amount;
    this.transaction.action = "PLUS";
    this.transaction.wallet = this.wallet;
    return this.transaction;
  }

  public _fillUp(idWallet: string): void {

    let operation: MoneyOperation = new MoneyOperation();

    operation.amount = +this.amount;
    operation.id = idWallet;

    this.subscriptions.push(this.walletService.setMoney(operation).subscribe(result => {
      console.log(result);
    }));

    this.subscriptions.push(this.transactionService.saveTransaction(this.createTransaction()).subscribe(() => {

    }));

    this.updateWallet();
    this.closeModal();
  }

}
