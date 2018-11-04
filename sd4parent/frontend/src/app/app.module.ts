import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule }   from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DescriptionPageModule } from "./description-page/description-page.module";
import { MainPageModule } from "./main-page/main-page.module";
import { NewPostPageModule } from "./new-post-page/new-post-page.module";
import { SubscriptionsPageModule } from "./subscriptions-page/subscriptions-page.module";
import { UsersPageModule } from "./users-page/users-page.module";
import { WalletPageModule } from "./wallet-page/wallet-page.module";

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component'
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    DescriptionPageModule,
    MainPageModule,
    NewPostPageModule,
    UsersPageModule,
    WalletPageModule,
    SubscriptionsPageModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
