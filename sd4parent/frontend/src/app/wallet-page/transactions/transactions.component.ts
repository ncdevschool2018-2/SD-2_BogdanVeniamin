import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription'

import { Transaction } from '../../model/transaction'
import { TransactionService } from "../../service/transaction.service";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  public transactions: Transaction[];
  private subscriptions: Subscription[] = [];

  constructor(private transactionService: TransactionService, private authService: AuthService) { }

  ngOnInit() {
     this.loadTransactions(this.authService.getUsername());
  }

  loadTransactions(login: string) {
    this.subscriptions.push(this.transactionService.getTransactionsByLogin(login).subscribe(actions => {
     this.transactions = actions as Transaction[];
     console.log("Transactions: " + this.transactions);
    }))
  }

  public _subDate(date: string): string {
    return date.substring(0, 10);
  }



}
