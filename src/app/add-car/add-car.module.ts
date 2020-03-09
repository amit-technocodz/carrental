import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCarComponent } from './list-car/list-car.component';
import { AddCarComponent } from './add-car/add-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'https://httpbin.org/post',
   maxFilesize: 50,
   acceptedFiles: 'image/*'
 };
 



@NgModule({
  declarations: [ListCarComponent, AddCarComponent, EditCarComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    DropzoneModule,
    RouterModule.forChild([
      {path:'',component:ListCarComponent},
      {path:'add',component:AddCarComponent},
      {path:'update/:id',component:EditCarComponent}

    ])
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  entryComponents:[
    ConfirmationDialogComponent
  ]
})
export class AddCarModule { }
