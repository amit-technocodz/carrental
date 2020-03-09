import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { DeleteconfirmationComponent } from './deleteconfirmation/deleteconfirmation.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AddComponent, ListComponent, UpdateComponent, DeleteconfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path:'',component:ListComponent},
      {path:'add',component:AddComponent},
      {path:'update/:id',component:UpdateComponent}
    ])
  ],
  entryComponents:[
    DeleteconfirmationComponent
  ]
})
export class CarmodelModule { }
