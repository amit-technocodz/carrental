import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [AddComponent, ListComponent, DeleteConfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path:'',component:ListComponent},
      {path:'add',component:AddComponent},
      {path:'update/:id',component:AddComponent}
    ]),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  entryComponents:[
    DeleteConfirmationComponent
  ],providers:[
    DatePipe
  ]
})
export class CarrentalModule { }
