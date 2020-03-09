import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AddComponent, ListComponent, EditComponent, DeleteConfirmationComponent],
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
    DeleteConfirmationComponent,
    ListComponent
  ]
})
export class CountryModule { }
