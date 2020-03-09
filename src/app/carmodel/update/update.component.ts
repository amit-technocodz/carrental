import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { service } from 'src/app/services/service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarModelExistValidator } from 'src/app/validators/carmodal.Exist.validators';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private _service: service,
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  CarmodelAddFormGroup: FormGroup;
  allcarmake: any;
  alltransmission: any;
  Id: any;

  ngOnInit() {
    this.GetAllCarMake();
    this.GetAllTrasmission();
    this.Id = +this.route.snapshot.params.id;
    this.CarmodelAddFormGroup = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      CarMakeId: new FormControl('', [Validators.required]),
      Capacity: new FormControl('', [Validators.required]),
      TransmissionType: new FormControl(''),
      Doors: new FormControl('', [Validators.required]),
      BigPieceLuggage: new FormControl(''),
      SmallPieceLuggage: new FormControl('')
    })
    this.GetallCarModel();
  }


  GetAllCarMake() {
    this._service.carmakeservice.GetAll().subscribe((res: any) => {
      if (res !== null) {
        this.allcarmake = res.data
      }
    })

  }

  GetAllTrasmission() {
    this.alltransmission = [{ Id: 1, Name: 'dummy' },
    { Id: 2, Name: 'Dummy1' }]

  }


  GetallCarModel() {
    this._service.carmodelservice.GetById(this.Id).subscribe((res: any) => {
      if (res.data != null) {
        this.BindData(res.data);
      }
    })
  }


  BindData(model) {
    this.CarmodelAddFormGroup.get('Name').setValue(model.Name);
    this.CarmodelAddFormGroup.get('CarMakeId').setValue(model.CarMakeId);
    this.CarmodelAddFormGroup.get('Capacity').setValue(model.Capacity);
    this.CarmodelAddFormGroup.get('TransmissionType').setValue(model.TransmissionType);
    this.CarmodelAddFormGroup.get('Doors').setValue(model.Doors);
    this.CarmodelAddFormGroup.get('BigPieceLuggage').setValue(model.BigPieceLuggage);
    this.CarmodelAddFormGroup.get('SmallPieceLuggage').setValue(model.SmallPieceLuggage);
  }

  Submit(model: any) {

    Object.keys(this.CarmodelAddFormGroup.controls).forEach(key => {
      this.CarmodelAddFormGroup.controls[key].markAsTouched();
    });

    model.CreatedOn = new Date();
    if (!this.CarmodelAddFormGroup.valid) {
      this.AddCarModelFormValidationMessage();
      return false;
    }
    this._service.carmodelservice.Update(this.Id, model).subscribe((data: any) => {
      if (data.returnCode == 0) {
        this.SuccessToaster('Carmodel Updated  successfully');
        this._router.navigate(['/admin/carmodel']);
      }
      else {
        this.ErrorToaster('Carmodel not Updated');
        this._router.navigate(['/admin/carmodel/update/' + this.Id]);
      }
    });
  }

  AddCarModelFormValidationMessage() {
    this.toastr.clear();
    if (this.CarmodelAddFormGroup.controls['CarMakeId'].hasError('required')) {
      this.ErrorToaster('Please select CarMake');
    }
    if (this.CarmodelAddFormGroup.controls['Name'].hasError('required')) {
      this.ErrorToaster('Please enter city name');
    }

    if (this.CarmodelAddFormGroup.controls['Capacity'].hasError('required')) {
      this.ErrorToaster('Please enter Capcity');
    }

    if (this.CarmodelAddFormGroup.controls['Doors'].hasError('required')) {
      this.ErrorToaster('Please enter Doors');
    }
  }

  ValidateName(formcontrol: FormControl) {
    return CarModelExistValidator.validate(formcontrol, 0, this._service.carmodelservice);
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
