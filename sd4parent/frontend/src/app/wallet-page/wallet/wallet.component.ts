import { Component, OnInit, TemplateRef } from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';
import { Subscription } from 'rxjs/internal/Subscription'
import { NgxSpinnerService } from 'ngx-spinner';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

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
  public modalRef: BsModalRef;

  constructor(private walletService: WalletService, private loadingService: NgxSpinnerService, private sessionSt: SessionStorageService, private modalService: BsModalService) { }

  ngOnInit() {
    this.loadWallet(this.getSessionStorage().login);
  }

  private loadWallet(login: string) {
    this.loadingService.show();
    this.subscriptions.push(this.walletService.getWalletByLogin(login).subscribe(newWallet => {
      this.wallet = newWallet as Wallet;
      console.log("Wallet: " + this.wallet.money);
      this.loadingService.hide();
    }))
  }

  private getSessionStorage(): User {
    return this.sessionSt.retrieve("logged-in");
  }

  public _openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public _closeModal(): void {
    this.modalRef.hide();
  }



}
