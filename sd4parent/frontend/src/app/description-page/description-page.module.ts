import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { ModalModule } from 'ngx-bootstrap/modal';
import {RouterModule} from "@angular/router";
import { NgxSpinnerModule } from 'ngx-spinner';
import {Ng2Webstorage} from 'ngx-webstorage';

import { DescriptionPageComponent } from './description-page.component';
import { DescriptionComponent } from "./description/description.component";
import { SubscribeComponent } from "./subscribe/subscribe.component";


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ModalModule,
    Ng2Webstorage,
    NgxSpinnerModule,
    RouterModule.forRoot([
      {
        path: 'posts/:id',
        component: DescriptionPageComponent
      }
    ])
  ],
  declarations: [
    DescriptionPageComponent,
    DescriptionComponent,
    SubscribeComponent
  ]
})
export class DescriptionPageModule { }
