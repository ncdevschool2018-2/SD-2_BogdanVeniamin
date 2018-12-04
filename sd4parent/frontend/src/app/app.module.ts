import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
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
import { WalletPageModule } from "./wallet-page/wallet-page.module"
import {Ng2Webstorage} from 'ngx-webstorage';
import { NewPackagePageModule } from "./new-package-page/new-package-page.module";
import { NewAdditionPageModule } from "./new-addition-page/new-addition-page.module";
import { NewPasswordPageModule } from "./new-password-page/new-password-page.module";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Interceptor } from "./service/interceptor.service";
import { TokenStorage } from "./storage/token.storage";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    NgxSpinnerModule,
    DescriptionPageModule,
    MainPageModule,
    NewPostPageModule,
    UsersPageModule,
    WalletPageModule,
    NewPackagePageModule,
    NewAdditionPageModule,
    NewPasswordPageModule,
    SubscriptionsPageModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule,
    Ng2Webstorage
  ],
  providers: [
    Interceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    TokenStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
