import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PaginationComponent } from "../pagination/pagination.component";
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';
import {NgAutoCompleteModule} from "ng-auto-complete";

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    HttpClientModule  ,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxPubSubModule,NgAutoCompleteModule,


    //Metrial components
    MatDialogModule,
    MatAutocompleteModule,

  ],
  exports:[
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    BsDatepickerModule,
    NgxPubSubModule,NgAutoCompleteModule,
  
   
 
    //Metrial  components
    MatAutocompleteModule,
    MatAutocompleteModule
  ],
  providers:[],
  
})
export class SharedModule { }
