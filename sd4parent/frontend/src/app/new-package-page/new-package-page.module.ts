import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPackagePageComponent } from './new-package-page.component';
import { NewPackageComponent } from './new-package/new-package.component';
import { FormsModule }   from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'new-package',
        component: NewPackagePageComponent
      }
    ])
  ],
  declarations: [NewPackagePageComponent, NewPackageComponent]
})
export class NewPackagePageModule { }
