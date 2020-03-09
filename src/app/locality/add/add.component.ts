import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { service } from 'src/app/services/service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  LocationAddFormGroup:FormGroup;
  allcity:any;
  ngOnInit() {
    this.LocationAddFormGroup = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      CityId: new FormControl('', [Validators.required]),
      // StatusId: new FormControl('', [Validators .required]),
    });
    this.GetAllCity();
  }
  GetAllCity() {
    return this._service.cityservice.GetAll().subscribe((result: any) => {
      debugger;
      this.allcity = result.data;
    });
  }


  Submit(model: any) {
    debugger;
    Object.keys(this.LocationAddFormGroup.controls).forEach(key => {
      this.LocationAddFormGroup.controls[key].markAsTouched();
    });
    model.CreatedOn = new Date();
    if (!this.LocationAddFormGroup.valid) {
      this.AddCityFormValidationMessage();
      return false;
    }
    return this._service.localityservice.Add(model).subscribe((data: any) => {

      if (data.returnCode == 0) {
        this.SuccessToaster('Location  added successfully');
        this._router.navigate(['/admin/locality']);
      }
      else {
        this.SuccessToaster('location not added');
        this._router.navigate(['/admin/locality/add']);
      }
    });
  }



  AddCityFormValidationMessage() {
    this.toastr.clear();
    if (this.LocationAddFormGroup.controls['CityId'].hasError('required')) {
      this.ErrorToaster('Please select city');
    }
    if (this.LocationAddFormGroup.controls['Name'].hasError('required')) {
      this.ErrorToaster('Please enter Location name');
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
