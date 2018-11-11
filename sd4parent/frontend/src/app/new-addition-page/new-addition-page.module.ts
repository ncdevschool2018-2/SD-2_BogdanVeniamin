import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAdditionPageComponent } from './new-addition-page.component';
import { NewAdditionComponent } from './new-addition/new-addition.component';
import { FormsModule }   from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from "@angular/router";
import { PostsComponent } from './posts/posts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    RouterModule.forRoot([
      {
        path: 'new-addition',
        component: NewAdditionPageComponent
      }
    ])
  ],
  declarations: [NewAdditionPageComponent, NewAdditionComponent, PostsComponent]
})
export class NewAdditionPageModule { }
