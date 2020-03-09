import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { service } from 'src/app/services/service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private _service:service, 
    private _router:Router,
    private route:ActivatedRoute

  ) { }

  Id:any;
  allregistercar:any;
  CarRentalData:FormGroup;
  ngOnInit() {
    debugger
    this.Id=this.route.snapshot.params.id;
    this.GetAllCar();
    this.CarRentalData= new FormGroup({
      CarRegistrationId:new FormControl('',Validators.required),
      BeforeDiscountPrice:new FormControl(''),
      Price:new FormControl('',Validators.required)
    })
    if(this.Id)
    {
      debugger
      this.GetById();
    }
    
  }


  GetAllCar()
  {
    debugger
    this._service.carregistrationservice.GetAll().subscribe((res:any)=>{
      if(res!=null)
      {
        this.allregistercar=res.data;
      }
    })
  }


  
  Submit(model: any) {
    debugger

    Object.keys(this.CarRentalData.controls).forEach(key => {
      this.CarRentalData.controls[key].markAsTouched();
    });

    model.CreatedOn = new Date();
    if (!this.CarRentalData.valid) {
      this.AddCarModelFormValidationMessage();
      return false;
    }


    if(this.Id!=null)
    {
      this._service.carrentalpriceservice.Update(this.Id,model).subscribe((data:any)=>{
        if(data.data!=null)
        {
          this.SuccessToaster("Updated Successfull");
          this._router.navigate(['/admin/carrentalprice']);
        }
      })

    }
    else{
      this._service.carrentalpriceservice.Add(model).subscribe((data: any) => {
        if (data.returnCode == 0) {
          this.SuccessToaster('Price added successfully');
          this._router.navigate(['/admin/carrentalprice']);
        }
        else {
          this.ErrorToaster('Carmodel not added');
          this._router.navigate(['/admin/carrentalprice/add']);
        }
      });
    }  
  }

  AddCarModelFormValidationMessage() {
    this.toastr.clear();
    if (this.CarRentalData.controls['CarRegistrationId'].hasError('required')) {
      this.ErrorToaster('Please select Register Car');
    }
    if (this.CarRentalData.controls['Price'].hasError('required')) {
      this.ErrorToaster('Please enter Price');
    }
  
  }

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


  GetById()
  {
    debugger
    this._service.carrentalpriceservice.GetById(this.Id).subscribe((res:any)=>{
      if(res.data!=null)
      {
        this.Binddata(res.data);

      }
    })
  }


  Binddata(model)
  {
    this.CarRentalData.get('CarRegistrationId').setValue(model.CarRegistrationId);
    this.CarRentalData.get('Price').setValue(model.Price);
    this.CarRentalData.get('BeforeDiscountPrice').setValue(model.BeforeDiscountPrice);
  }



}
