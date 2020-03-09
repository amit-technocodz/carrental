import { Component, OnInit } from '@angular/core';
import { service } from 'src/app/services/service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor( private _service:service, private toastr:ToastrService ,private _router:Router ,private route:ActivatedRoute) { }
  CarMakeAddFormGroup:FormGroup;
  Id:any;
  carmake:any

  ngOnInit() {
    this.CarMakeAddFormGroup = new FormGroup({
      Id:new FormControl(''),
      Name: new FormControl('', [Validators.required]),
    });
    this.Id=this.route.snapshot.params.id;
    this.GetCarMake()
  }

  GetCarMake()
  {
    debugger
    this._service.carmakeservice.Getbyid(this.Id).subscribe((res:any)=>{
      this.carmake=res.data;
      this.binddata(res.data);
    })

  }

  binddata(data)
  {
    this.CarMakeAddFormGroup.get('Id').setValue(data.Id);
    this.CarMakeAddFormGroup.get('Name').setValue(data.Name);
  }

  Submit(model:any) {
    Object.keys(this.CarMakeAddFormGroup.controls).forEach(key=>{
      this.CarMakeAddFormGroup.controls[key].markAsTouched();
    });

    model.UpdatedOn = new Date();

    if (!this.CarMakeAddFormGroup.valid) {
      this.AddCountryFormValidationMessage();
      return false;
    }
    return this._service.carmakeservice.update(this.carmake.Id,model).subscribe((data: any)=> {
      if (data.returnCode == 0) {
        this.SuccessToaster('CarMake updated successfully');
        this._router.navigate(['/admin/carmake']);
      }
      else {
        this.ErrorToaster('Country not updated');
        this._router.navigate(['/admin/carmake/',[this.carmake.Id]]);
      }
    });
  }
  

  
  AddCountryFormValidationMessage() {
    this.toastr.clear();
 
    if (this.CarMakeAddFormGroup.controls['Name'].hasError('required')) {
      this.ErrorToaster('Please enter Country name');
    }
    // else {
    //   if (this.CountryUpdateFormGroup.controls['Name'].hasError('exist')) {
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

  SuccessToaster(message) {
    this.toastr.clear();
    this.toastr.success(message, null, {
      timeOut: 5000,
      closeButton: false,
      positionClass: 'toast-top-center'
    });
  }

  // ValidateName(formcontrol: FormControl) {
  //   return CountryExistValidator.validate(formcontrol, this.country.Id, this._service.countryservice);
  // }



}
