import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AddComponent, ListComponent, DeleteConfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path:'',component:ListComponent},
      {path:'add',component:AddComponent},
      {path:'update/:id',component:AddComponent}
    ])

  ],
  entryComponents:[
    DeleteConfirmationComponent
  ]
})
export class CarrentalpriceModule { }
