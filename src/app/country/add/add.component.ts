import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountryExistValidator } from 'src/app/validators/countryExist.validator';
import{service} from '../../services/service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
 

  constructor( private _service:service,private toastr:ToastrService ,private _router:Router) { }
  CountryAddFormGroup: FormGroup;

  ngOnInit() {
    this.CountryAddFormGroup = new FormGroup({
      Name: new FormControl('', [Validators.required], [this.ValidateName.bind(this)]),
      CountryCode: new FormControl('', [Validators.required]),
    });
  } 


  Submit(model: any) {

    Object.keys(this.CountryAddFormGroup.controls).forEach(key => {
      this.CountryAddFormGroup.controls[key].markAsTouched();
    });

    model.CreatedOn = new Date();
    if (!this.CountryAddFormGroup.valid) {
      this.AddCountryFormValidationMessage();
      return false;
    }
    this._service.countryservice.Add(model).subscribe((data: any) => {
      if (data.returnCode == 0) {
        this.SuccessToaster('Country added successfully');
        this._router.navigate(['/admin/country']);
      }
      else {
        this.ErrorToaster('Country not added');
        this._router.navigate(['/admin/country/add']);
      }
    });
  }

  AddCountryFormValidationMessage() {
    this.toastr.clear();
    if (this.CountryAddFormGroup.controls['CountryCode'].hasError('required')) {
      this.ErrorToaster('Please enter country code');
    }
    if (this.CountryAddFormGroup.controls['Name'].hasError('required')) {
      this.ErrorToaster('Please enter Country name');
    }
    else {
      if (this.CountryAddFormGroup.controls['Name'].hasError('exist')) {
        this.ErrorToaster('Country name already exist');
      }
    }
  }

  //Display Error message
  ErrorToaster(message) {
    this.toastr.error(message, null, {
      timeOut: 5000,
      closeButton: false,
      positionClass: 'toast-top-center'
    });
  }

  ValidateName(formcontrol: FormControl) {
    return CountryExistValidator.validate(formcontrol, 0, this._service.countryservice);
  }

  SuccessToaster(message) {
    this.toastr.clear();
    this.toastr.success(message, null, {
      timeOut: 5000,
      closeButton: false,
      positionClass: 'toast-top-center'
    });
  }

}
