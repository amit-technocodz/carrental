import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from '../layout/layout.component';
import {AdminlayoutComponent} from '../adminlayout/adminlayout.component';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //RouterModule.forRoot(routes)
  ],
  exports: []
})
export class RoutingModule { }
