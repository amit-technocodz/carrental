import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { service } from 'src/app/services/service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarModelExistValidator } from 'src/app/validators/carmodal.Exist.validators';

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

  CarmodelAddFormGroup:FormGroup;
  allcarmake:any;
  alltransmission:any;


  ngOnInit() {
    this.CarmodelAddFormGroup=new FormGroup({
      Name:new FormControl('',[Validators.required],[this.ValidateName.bind(this)]),
      CarMakeId:new FormControl('',[Validators.required]),
      Capacity:new FormControl('',[Validators.required]),
      TransmissionType:new FormControl(''),
      Doors:new FormControl('',[Validators.required]),
      BigPieceLuggage:new FormControl(''),
      SmallPieceLuggage:new FormControl('')
    })
    this.GetAllCarMake();
    this.GetAllTrasmission();

  } 
 

  GetAllCarMake()
  {
    this._service.carmakeservice.GetAll().subscribe((res:any)=>{
      if(res!==null)
      {
        this.allcarmake=res.data
      }
    })

  }

  GetAllTrasmission()
  {
    this.alltransmission=[{Id:1,Name:'dummy'},
  {Id:2,Name:'Dummy1'}]

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
    this._service.carmodelservice.Add(model).subscribe((data: any) => {
      if (data.returnCode == 0) {
        this.SuccessToaster('Carmodel added successfully');
        this._router.navigate(['/admin/carmodel']);
      }
      else {
        this.ErrorToaster('Carmodel not added');
        this._router.navigate(['/admin/carmodel/add']);
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
    else {
      if (this.CarmodelAddFormGroup.controls['Name'].hasError('exist')) {
        this.ErrorToaster('CarModal Name already exist');
      }
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
