import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DeleteconfirmationComponent } from './deleteconfirmation/deleteconfirmation.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DropzoneConfigInterface, DROPZONE_CONFIG, DropzoneModule } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'https://httpbin.org/post',
   maxFilesize: 50,
   acceptedFiles: 'image/*'
 };
 

@NgModule({
  declarations: [AddComponent, ListComponent, DeleteconfirmationComponent],
  imports: [
    CommonModule,
    SharedModule, 
    DropzoneModule,
    RouterModule.forChild([
      {path:'',component:ListComponent},
      {path:'update/:id',component:AddComponent},
      {path:'add',component:AddComponent}
    ])
  ],entryComponents:[
    DeleteconfirmationComponent,
    ListComponent
  ] , 
   providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
})
export class CarRegistrationModule { }
