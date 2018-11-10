import { Component, OnInit } from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';
import { Subscription } from 'rxjs/internal/Subscription'

import { Transaction } from '../../model/transaction'
import { TransactionService } from "../../service/transaction.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  public transactions: Transaction[];
  private subscriptions: Subscription[] = [];

  constructor(private transactionService: TransactionService, private sessionSt: SessionStorageService) { }

  ngOnInit() {
    this.loadTransactions(this.getSessionStorage().login);
  }

  loadTransactions(login: string) {
    this.subscriptions.push(this.transactionService.getTransactionsByLogin(login).subscribe(actions => {
     this.transactions = actions as Transaction[];
     console.log("Transactions: " + this.transactions);
    }))
  }

  private getSessionStorage(): User {
    return this.sessionSt.retrieve("logged-in");
  }

}
