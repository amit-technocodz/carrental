import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { DeleteconfirmationComponent } from './deleteconfirmation/deleteconfirmation.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AddComponent, EditComponent, ListComponent, DeleteconfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path:'',component:ListComponent},
      {path:'add',component:AddComponent},
      {path:'update/:id',component:EditComponent}
    ])
  ],
  entryComponents:[
    DeleteconfirmationComponent
  ]

})
export class CarmakeModule { }
