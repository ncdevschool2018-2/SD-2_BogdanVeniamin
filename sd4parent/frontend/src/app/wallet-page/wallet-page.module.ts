import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { WalletPageComponent } from './wallet-page.component';
import { WalletComponent } from "./wallet/wallet.component";

@NgModule({
  imports: [
    CommonModule,
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
  ]
})
export class WalletPageModule { }
