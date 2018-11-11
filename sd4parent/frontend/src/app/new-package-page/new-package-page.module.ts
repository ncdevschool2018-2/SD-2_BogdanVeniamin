import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPackagePageComponent } from './new-package-page.component';
import { NewPackageComponent } from './new-package/new-package.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NewPackagePageComponent, NewPackageComponent]
})
export class NewPackagePageModule { }
