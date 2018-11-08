import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import {Ng2Webstorage} from 'ngx-webstorage';
import { HttpModule } from '@angular/http';

import { WalletPageComponent } from './wallet-page.component';
import { WalletComponent } from "./wallet/wallet.component";
import { ExchangeService } from "../service/exchange.service";

@NgModule({
  imports: [
    CommonModule,
    Ng2Webstorage,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'wallet',
        component: WalletPageComponent
      }
    ])
  ],
  declarations: [
    WalletPageComponent,
    WalletComponent
  ],
  providers: [ExchangeService]
})
export class WalletPageModule { }
