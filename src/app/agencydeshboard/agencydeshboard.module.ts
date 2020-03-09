import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeshboardComponent } from './deshboard/deshboard.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [DeshboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {'path':'',component:DeshboardComponent}
    ])
  ]
})
export class AgencydeshboardModule { }
