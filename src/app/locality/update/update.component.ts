import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { service } from 'src/app/services/service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _service:service
  ) { }

  CityUpdateFormGroup: FormGroup;
  id:any;
  location:any
  allcity:any

  ngOnInit() {
    debugger
    this.GetAllCity();
    this.id=this.route.snapshot.params.id;
    this.CityUpdateFormGroup = new FormGroup({
      Id: new FormControl(''),
      Name: new FormControl('', [Validators.required]),
      CityId: new FormControl('', [Validators.required]),
      //StatusId: new FormControl('', [Validators .required]),
    });
    this.GetAllLocation(); 
  }

  GetAllLocation() {
    debugger
        const location = this._service.localityservice.getlocation(this.id).subscribe((data: any) => {
          debugger;
          this.location = data.data;
          this.SetCityFormData(data.data);
        });
      }
      SetCityFormData(data: any) {
        debugger;
        this.CityUpdateFormGroup.get('Id').setValue(data.Id);
        this.CityUpdateFormGroup.get('Name').setValue(data.Name);
        this.CityUpdateFormGroup.get('CityId').setValue(data.CityId);
        //this.CityUpdateFormGroup.get('StatusId').setValue(data.StatusId);
      }
      GetAllCity() {
        return this._service.cityservice.GetAll().subscribe((result: any) => {
          debugger;
          this.allcity = result.data;
        });
    
      }
      Submit(model: any) {
        debugger
        Object.keys(this.CityUpdateFormGroup.controls).forEach(key => {
          this.CityUpdateFormGroup.controls[key].markAsTouched();
        });
        model.UpdatedOn = new Date();
        if (!this.CityUpdateFormGroup.valid) {
          this.UpdateCityFormValidationMessage();
          return false;
        }
        return this._service.cityservice.Update(this.id, model).subscribe((data: any) => {
          if (data.returnCode == 0) {
            this.SuccessToaster('Location updated successfully');
            this._router.navigate(['/admin/locality']);
          }
          else {
            this.ErrorToaster('Locaton not updated');
            this._router.navigate(['/admin/locality/', [this.id]]);
          }
        });
      }
    
    
      UpdateCityFormValidationMessage() {
        this.toastr.clear();
        if (this.CityUpdateFormGroup.controls['CityId'].hasError('required')) {
          this.ErrorToaster('Please select city');
        }
        if (this.CityUpdateFormGroup.controls['Name'].hasError('required')) {
          this.ErrorToaster('Please enter location name');
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
