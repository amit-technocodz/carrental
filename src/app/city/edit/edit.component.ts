import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/classes/city';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import{service} from '../../services/service';
import { Country } from 'src/app/models/classes/country';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: number;
  city: City;
  allCountries: Country[];

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _service:service
  ) { }
  CityUpdateFormGroup: FormGroup;
  ngOnInit() {
    this.GetAllCountries();
    this.id=this.route.snapshot.params.id;
    this.CityUpdateFormGroup = new FormGroup({
      Id: new FormControl(''),
      Name: new FormControl('', [Validators.required]),
      CountryId: new FormControl('', [Validators.required]),
      //StatusId: new FormControl('', [Validators .required]),
    });
    this.GetCity();
  }

  GetCity() {
debugger
    const city = this._service.cityservice.GetCity(this.id).subscribe((data: any) => {
      debugger;
      this.city = data.data;
      this.SetCityFormData(data.data);
    });
  }
  SetCityFormData(data: City) {
    debugger;
    this.CityUpdateFormGroup.get('Id').setValue(data.Id);
    this.CityUpdateFormGroup.get('Name').setValue(data.Name);
    this.CityUpdateFormGroup.get('CountryId').setValue(data.CountryId);
    //this.CityUpdateFormGroup.get('StatusId').setValue(data.StatusId);
  }
  GetAllCountries() {
    return this._service.countryservice.GetAll().subscribe((result: any) => {
      debugger;
      this.allCountries = result.data;
    });

  }
  Submit(model: City) {
    debugger
    Object.keys(this.CityUpdateFormGroup.controls).forEach(key => {
      this.CityUpdateFormGroup.controls[key].markAsTouched();
    });
    model.UpdatedOn = new Date();
    if (!this.CityUpdateFormGroup.valid) {
      this.UpdateCityFormValidationMessage();
      return false;
    }
    return this._service.cityservice.Update(this.city.Id, model).subscribe((data: any) => {
      if (data.returnCode == 0) {
        this.SuccessToaster('City updated successfully');
        this._router.navigate(['/admin/city']);
      }
      else {
        this.ErrorToaster('City not updated');
        this._router.navigate(['/admin/city/', [this.city.Id]]);
      }
    });
  }


  UpdateCityFormValidationMessage() {
    this.toastr.clear();
    if (this.CityUpdateFormGroup.controls['CountryId'].hasError('required')) {
      this.ErrorToaster('Please select country');
    }
    if (this.CityUpdateFormGroup.controls['Name'].hasError('required')) {
      this.ErrorToaster('Please enter city name');
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

  SuccessToaster(message) {
    this.toastr.clear();
    this.toastr.success(message, null, {
      timeOut: 5000,
      closeButton: false,
      positionClass: 'toast-top-center'
    });
  }
}
