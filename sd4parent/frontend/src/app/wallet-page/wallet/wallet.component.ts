import { Component, OnInit } from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';
import { Subscription } from 'rxjs/internal/Subscription'
import { NgxSpinnerService } from 'ngx-spinner';
import {BsModalService} from "ngx-bootstrap";

import { Wallet } from '../../model/wallet'
import { WalletService } from "../../service/wallet.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  public wallet: Wallet;
  private subscriptions: Subscription[] = [];

  constructor(private walletService: WalletService, private loadingService: NgxSpinnerService, private sessionSt: SessionStorageService, private modalService: BsModalService) { }

  ngOnInit() {
    this.loadWallet(this.getSessionStorage().id);
  }

  private loadWallet(walletId: string) {
    this.loadingService.show();
    this.subscriptions.push(this.walletService.getWallet(walletId).subscribe(newWallet => {
      this.wallet = newWallet as Wallet;
      console.log("Wallet: " + this.wallet.money);
      this.loadingService.hide();
    }))
  }

  private getSessionStorage(): User {
    return this.sessionSt.retrieve("logged-in");
  }
}
