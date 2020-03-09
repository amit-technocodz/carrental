import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import{service} from '../../services/service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountryExistValidator } from 'src/app/validators/countryExist.validator';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  Id: number;
country:any;

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _service:service
  ) { }
  CountryUpdateFormGroup:FormGroup;

  ngOnInit() {
    this.CountryUpdateFormGroup = new FormGroup({
      Id:new FormControl(''),
      Name: new FormControl('', [Validators.required],[this.ValidateName.bind(this)]),
      CountryCode: new FormControl('', [Validators .required]),
      //StatusId: new FormControl('', [Validators .required]),
    });
 this.Id=this.route.snapshot.params.id;
    this.GetCountry(this.Id)

  }

  GetCountry(Id: number) {
    debugger;
    const country = this._service.countryservice.GetById(Id).subscribe((data: any) => {
      debugger;
     this.country=data.data;
     this.SetCountryFormData(data.data);
    });
  }
  SetCountryFormData(data: any) {
    this.CountryUpdateFormGroup.get('Id').setValue(data.Id);
    this.CountryUpdateFormGroup.get('Name').setValue(data.Name);
    this.CountryUpdateFormGroup.get('CountryCode').setValue(data.CountryCode);
    //this.CountryUpdateFormGroup.get('StatusId').setValue(data.StatusId);
  }
    Submit(model:any) {
      Object.keys(this.CountryUpdateFormGroup.controls).forEach(key=>{
        this.CountryUpdateFormGroup.controls[key].markAsTouched();
      });

      model.UpdatedOn = new Date();

      if (!this.CountryUpdateFormGroup.valid) {
        this.AddCountryFormValidationMessage();
        return false;
      }
      return this._service.countryservice.Update(this.country.Id,model).subscribe((data: any)=> {
        if (data.returnCode == 0) {
          this.SuccessToaster('Country updated successfully');
          this._router.navigate(['/admin/country']);
        }
        else {
          this.ErrorToaster('Country not updated');
          this._router.navigate(['/admin/country/',[this.country.Id]]);
        }
      });
    }
    
  
    
    AddCountryFormValidationMessage() {
      this.toastr.clear();
      if (this.CountryUpdateFormGroup.controls['CountryCode'].hasError('required')) {
        this.ErrorToaster('Please enter country code');
      }
      if (this.CountryUpdateFormGroup.controls['Name'].hasError('required')) {
        this.ErrorToaster('Please enter Country name');
      }
      else {
        if (this.CountryUpdateFormGroup.controls['Name'].hasError('exist')) {
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

    SuccessToaster(message) {
      this.toastr.clear();
      this.toastr.success(message, null, {
        timeOut: 5000,
        closeButton: false,
        positionClass: 'toast-top-center'
      });
    }

    ValidateName(formcontrol: FormControl) {
      return CountryExistValidator.validate(formcontrol, this.country.Id, this._service.countryservice);
    }

}
