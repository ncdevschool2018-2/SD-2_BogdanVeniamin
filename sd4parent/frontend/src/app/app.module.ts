import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule }   from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component'
import { NavbarComponent } from './navbar/navbar.component';
import {PostsComponent} from "./posts/posts.component";
import { DescriptionComponent } from './description/description.component';
import { WalletComponent } from './wallet/wallet.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { UsersComponent } from './users/users.component';
import { NewPostComponent } from './new-post/new-post.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    FooterComponent,
    NavbarComponent,
    DescriptionComponent,
    WalletComponent,
    SubscriptionsComponent,
    UsersComponent,
    NewPostComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    Ng4LoadingSpinnerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: PostsComponent
      },
      {
        path: 'posts/:id',
        component: DescriptionComponent
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'new-post',
        component: NewPostComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
