import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsPageComponent } from './subscriptions-page.component';
import { SubscriptionsComponent } from "./subscriptions/subscriptions.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'subscriptions',
        component: SubscriptionsPageComponent
      }
    ])
  ],
  declarations: [
    SubscriptionsPageComponent,
    SubscriptionsComponent
  ]
})
export class SubscriptionsPageModule { }
