import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CarAvailabilityComponent } from './car-availability.component';
import { ReactiveFormsModule } from '@angular/forms';

// import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

@NgModule({
  declarations: [CarAvailabilityComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path:'',component:CarAvailabilityComponent}
    ]),
  ],
  entryComponents:[
    // DeleteConfirmationComponent
  ],providers:[
    DatePipe
  ]
})
export class CarAvailabilityModule { }
