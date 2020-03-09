import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { City } from 'src/app/models/classes/city';
import { ToastrService } from 'ngx-toastr';
import{service} from '../../services/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private _service:service, 
    private _router:Router
 

  ) { }
  CityAddFormGroup: FormGroup;
  
  allCountries:any;

  ngOnInit() {
    this.CityAddFormGroup = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      CountryId: new FormControl('', [Validators.required]),
      // StatusId: new FormControl('', [Validators .required]),
    });
    this.GetAllCountries();
  }

  GetAllCountries() {
    return this._service.countryservice.GetAll().subscribe((result: any) => {
      debugger;
      this.allCountries = result.data;
    });
  }

  Submit(model: City) {
    debugger;
    Object.keys(this.CityAddFormGroup.controls).forEach(key => {
      this.CityAddFormGroup.controls[key].markAsTouched();
    });
    model.CreatedOn = new Date();
    if (!this.CityAddFormGroup.valid) {
      this.AddCityFormValidationMessage();
      return false;
    }
    return this._service.cityservice.Add(model).subscribe((data: any) => {

      if (data.returnCode == 0) {
        this.SuccessToaster('City added successfully');
        this._router.navigate(['/admin/city']);
      }
      else {
        this.SuccessToaster('City not added');
        this._router.navigate(['/admin/city/add']);
      }
    });
  }



  AddCityFormValidationMessage() {
    this.toastr.clear();
    if (this.CityAddFormGroup.controls['CountryId'].hasError('required')) {
      this.ErrorToaster('Please select country');
    }
    if (this.CityAddFormGroup.controls['Name'].hasError('required')) {
      this.ErrorToaster('Please enter city name');
    }

  }
  //Display Error message
  ErrorToaster(message) {
    debugger;
    this.toastr.error(message, null, {
      timeOut: 5000,
      closeButton: false,
      positionClass: 'toast-top-center'
    });
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
