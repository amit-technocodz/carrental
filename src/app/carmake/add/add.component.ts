import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { service } from 'src/app/services/service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
 
  constructor( private _service:service, private toastr:ToastrService ,private _router:Router) { }
  CarMakeAddFormGroup:FormGroup;

  ngOnInit() { 
    this.CarMakeAddFormGroup = new FormGroup({
      Name: new FormControl('', [Validators.required]),
    });
  }

  Submit(model: any) {

    Object.keys(this.CarMakeAddFormGroup.controls).forEach(key => {
      this.CarMakeAddFormGroup.controls[key].markAsTouched();
    });

    model.CreatedOn = new Date();
    model.IsActive=true;
    if (!this.CarMakeAddFormGroup.valid) {
      this.AddCountryFormValidationMessage();
      return false;
    }
    this._service.carmakeservice.Create(model).subscribe((data: any) => {
      if (data.returnCode == 0) {
        this.SuccessToaster('Country added successfully');
        this._router.navigate(['/admin/carmake']);
      }
      else {
        this.ErrorToaster('Country not added');
        this._router.navigate(['/admin/carmake/add']);
      }
    });
  }

  AddCountryFormValidationMessage() {
    this.toastr.clear();
  
    if (this.CarMakeAddFormGroup.controls['Name'].hasError('required')) {
      this.ErrorToaster('Please enter Country name');
    }
    // else {
    //   if (this.CountryAddFormGroup.controls['Name'].hasError('exist')) {
    //     this.ErrorToaster('Country name already exist');
    //   }
    // }
  }

  //Display Error message
  ErrorToaster(message) {
    this.toastr.error(message, null, {
      timeOut: 5000,
      closeButton: false,
      positionClass: 'toast-top-center'
    });
  }

  // ValidateName(formcontrol: FormControl) {
  //   return CountryExistValidator.validate(formcontrol, 0, this._service.countryservice);
  // }

  SuccessToaster(message) {
    this.toastr.clear();
    this.toastr.success(message, null, {
      timeOut: 5000,
      closeButton: false,
      positionClass: 'toast-top-center'
    });
  }

}
