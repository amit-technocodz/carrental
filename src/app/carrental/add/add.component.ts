import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { service } from 'src/app/services/service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';




@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {





  optionsModel: number[];
  dropdownSettings: IDropdownSettings;

  allLocation: any;
  allPaymentStatus: any;
  allBookingstatus: any;
  allCarRegistration: any;
  Id: any;
  DriverId: any;

  selectedLocation: any;
  BindLocationId: any;
  BindSelectedLocation: any;
  selectedItems: any;

  PriceAccodingtoDays: any;
  OfferAccordingPrice: any;
  CountDays: any;
  disabledDates: any = [];



  constructor(
    private toastr: ToastrService,
    private _service: service,
    private _router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  RouterFormdata: FormGroup;
  today = new Date();
  BookingFrom = new Date();
  BookingTo = new Date();


  mindate: any;

  ngOnInit() {
    this.Id = this.route.snapshot.params.id;
    this.GetAllLocation();
    this.GetAllPaymentStatus();
    this.GetAllBookingStatus();
    this.GetAllRegisterCar();

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true
    };






    this.RouterFormdata = new FormGroup({
      CarRegistrationId: new FormControl('', Validators.required),
      BookingFrom: new FormControl('', Validators.required),
      BookingTo: new FormControl('', Validators.required),
      PickUpLocationId: new FormControl(''),
      BookingAmount: new FormControl('', Validators.required),
      AmountPaid: new FormControl(''),
      BookedById: new FormControl(''),
      PaymentStatusId: new FormControl('', Validators.required),
      BookedStatusId: new FormControl('', Validators.required),
      BindSelectedLocation: new FormControl(''),
      DriverDetail: new FormGroup({
        FirstName: new FormControl('', Validators.required),
        LastName: new FormControl('', Validators.required),
        Email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
        PhoneNumber: new FormControl(),
        IsDriverAgeDesired: new FormControl(),
        FlightNumber: new FormControl()
      })
    })

    if (this.Id) {
      debugger
      this.GetAllRegisterdata();

    }

    //   this.RouterFormdata = this.fb.group({
    //     BindSelectedLocation: [this.selectedItems]
    // });

  }

  GetAllLocation() {
    debugger
    this._service.localityservice.GetAll().subscribe((res: any) => {
      this.allLocation = [];
      if (res.data != null) {
        res.data.forEach(element => {
          this.allLocation.push({ item_id: element.Id, item_text: element.Name });
        });
      }
    })

  }

  GetAllPaymentStatus() {
    debugger
    this._service.paymentstatus.GetAll().subscribe((res: any) => {
      if (res.data != null) {
        this.allPaymentStatus = res.data;
      }
    })
  }

  GetAllBookingStatus() {
    debugger
    this._service.bokingstatus.GetAll().subscribe((data: any) => {
      if (data.data != null)
        this.allBookingstatus = data.data;
    })
  }

  GetAllRegisterCar() {
    debugger
    this._service.carregistrationservice.GetAll().subscribe((res: any) => {
      if (res.data != null)
        this.allCarRegistration = res.data;
    })

  }

  onSubmit(model) {


    Object.keys(this.RouterFormdata.controls).forEach(key => {
      this.RouterFormdata.controls[key].markAsTouched();
    });
    model.CreatedOn = new Date();

    if (!this.RouterFormdata.valid) {
      this.AddCarModelFormValidationMessage();
      return false;
    }

    debugger
    model.BookedById = 1;

    if (this.Id != null) {
      model.PickUpLocationId = this.selectedLocation;
      model.UpdatedOn = new Date();
      model.DriverDetail.Id = this.DriverId;
      model.DriverDetail.UpdatedOn = new Date();
      this._service.carrental.Update(this.Id, model).subscribe((data: any) => {
        if (data.data != null) {
          this.SuccessToaster("data Updated SuccessFully");
          this._router.navigate(['/admin/carrental'])
        }
      })
    }
    else {
      model.PickUpLocationId = this.selectedLocation;
      model.CreatedOn = new Date();
      model.DriverDetail.IsActive = true;
      model.DriverDetail.CreatedOn = new Date();
      this._service.carrental.Add(model).subscribe((res: any) => {
        if (res.data != null) {
          this.SuccessToaster("Booking Add successfully")
          this._router.navigate(['/admin/carrental']);
        }
      })


    }





  }

  Filterprice(event) {
    debugger
    this.allCarRegistration.forEach(element => {
      if (element.Id == event.target.value) {
        this.PriceAccodingtoDays = element.CarRentalPrice.Price;
        this.OfferAccordingPrice = element.CarRentalPrice.BeforeDiscountPrice;

      }

    });
  }

  SetMindate(event) {
    this.mindate = event;
  }


  Countdays(event) {
    debugger
    var date = this.RouterFormdata.value.BookingFrom;
    var date1, date2;
    date1 = new Date(date);
    date2 = new Date(event);
    var res = Math.abs(date1 - date2) / 1000;
    var days = Math.floor(res / 86400);
    this.BindAmount(days);
    console.log(days)
  }
  BindAmount(data) {
    debugger
    var acctualPrice = +this.PriceAccodingtoDays * (+data);

    if (this.OfferAccordingPrice) {
      var actualofferprice = acctualPrice - (acctualPrice * this.OfferAccordingPrice / 100);
      this.RouterFormdata.get('BookingAmount').setValue(actualofferprice);
    }
    else {
      this.RouterFormdata.get('BookingAmount').setValue(acctualPrice);
    }

  }



  AddCarModelFormValidationMessage() {
    this.toastr.clear();

    const DriverDetail: any = this.RouterFormdata.controls['DriverDetail'];

    if (this.RouterFormdata.controls['CarRegistrationId'].hasError('required')) {
      this.ErrorToaster('Please select  Register car');
    }
    if (this.RouterFormdata.controls['BookingFrom'].hasError('required')) {
      this.ErrorToaster('Please Select Booking FromDate');
    }

    if (this.RouterFormdata.controls['BookingTo'].hasError('exist')) {
      this.ErrorToaster('Please Select Booking To Date ');
    }


    if (this.RouterFormdata.controls['PickUpLocationId'].hasError('required')) {
      this.ErrorToaster('Please select Pickup location');
    }

    if (this.RouterFormdata.controls['PaymentStatusId'].hasError('required')) {
      this.ErrorToaster('Please Select Payment status Id');
    }

    if (this.RouterFormdata.controls['BookedStatusId'].hasError('required')) {
      this.ErrorToaster('Please Select Booking status Id');
    }


    if (DriverDetail.controls['FirstName'].hasError('required')) {
      this.ErrorToaster('Please enter your name');
    }


    if (DriverDetail.controls['LastName'].hasError('required')) {
      this.ErrorToaster('Please enter your  Last name');
    }



    if (DriverDetail.controls['Email'].hasError('required')) {
      this.ErrorToaster('Please Enter Email');
    }
    else {

      if (DriverDetail.controls['Email'].hasError('pattern')) {
        this.ErrorToaster('Please Enter Valid Email');
      }
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

  selectEvent(event) {
    debugger
    var selected_employee = JSON.stringify(event)
    console.log(selected_employee);

  }


  //Edit Purpose


  FilterWhenbindingPrice(Id) {
    debugger
    this.allCarRegistration.forEach(element => {
      if (element.Id == Id) {
        this.PriceAccodingtoDays = element.CarRentalPrice.Price;
        this.OfferAccordingPrice = element.CarRentalPrice.BeforeDiscountPrice;

      }

    });

  }


  GetAllRegisterdata() {
    debugger
    this._service.carrental.GetById(this.Id).subscribe((res: any) => {
      debugger
      if (res.data != null) {
        this.FilterWhenbindingPrice(res.data.CarRegistrationId);
        this.DriverId = res.data.DriverDetail.Id;
        this.BindLocationId = res.data.PickUpLocationId;
        this.bindlocation();
        this.BindUser(res.data);

      }
    })
  }

  BindUser(data) {
    debugger
    this.RouterFormdata.get('BookingAmount').setValue(data.BookingAmount);
    this.RouterFormdata.get('CarRegistrationId').setValue(data.CarRegistrationId);
    this.RouterFormdata.get('BookingFrom').setValue(data.BookingFrom);
    this.RouterFormdata.get('BookingTo').setValue(data.BookingTo);
    // this.RouterFormdata.get('PickUpLocationId').setValue(data.PickUpLocationId);
    //this.RouterFormdata.get('BindSelectedLocation').setValue(this.selectedItems);
    this.RouterFormdata.get('BookingAmount').setValue(data.BookingAmount);
    this.RouterFormdata.get('AmountPaid').setValue(data.AmountPaid);
    this.RouterFormdata.get('BookedById').setValue(data.BookedById);
    this.RouterFormdata.get('PaymentStatusId').setValue(data.PaymentStatusId);
    this.RouterFormdata.get('BookedStatusId').setValue(data.BookedStatusId);
    this.RouterFormdata.get('DriverDetail').get('FirstName').setValue(data.DriverDetail.FirstName);
    this.RouterFormdata.get('DriverDetail').get('LastName').setValue(data.DriverDetail.LastName);
    this.RouterFormdata.get('DriverDetail').get('Email').setValue(data.DriverDetail.Email);
    this.RouterFormdata.get('DriverDetail').get('PhoneNumber').setValue(data.DriverDetail.PhoneNumber);
    this.RouterFormdata.get('DriverDetail').get('IsDriverAgeDesired').setValue(data.DriverDetail.IsDriverAgeDesired);
    this.RouterFormdata.get('DriverDetail').get('FlightNumber').setValue(data.DriverDetail.FlightNumber);

  }

  bindlocation() {
    debugger
    this.selectedItems = [];
    debugger
    this.allLocation.forEach(element => {
      if (element.item_id == this.BindLocationId) {

        this.selectedItems.push({ item_id: element.item_id, item_text: element.item_text })

      }
    });


  }


  onLocationSelect(item: any) {
    debugger
    this.selectedLocation = item.item_id;

  }

  onLocationDeSelect(item: any) {
    debugger
    this.selectedLocation = "";

  }
  // getDisabledDates() {
  //   var id = this.RouterFormdata.get('CarRegistrationId').value;

  //   if (id != null) {
  //     this._service.carrental.getDates(id).subscribe((result: any) => {
  //       result.data.forEach((date: any) => {
  //         let startDate = date.BookingFrom.split('T')[0].split("-");
  //         console.log(startDate);
  //         let endDate = date.BookingTo.split('T')[0].split("-");
  //         let temp1Data = this.getDates(new Date(startDate[0], startDate[1], startDate[2]), new Date(new Date(endDate[0], endDate[1], endDate[2])));
  //         temp1Data.forEach(element => {
  //           var mm = element.getMonth();
  //           var dd = element.getDate();
  //           var yyyy = element.getFullYear();

  //           if (dd < 10)
  //             dd = '0' + dd;
  //           if (mm < 10)
  //             mm = '0' + mm;
              
  //           var today = yyyy + '-' + mm + '-' + dd;
  //           this.disabledDates.push(new Date(today));
  //         });
  //       });
  //     });
  //   };
  // }

  // getDates(startDate, endDate) {
  //   var dates = [],
  //     currentDate = startDate,
  //     addDays = function (days) {
  //       var date = new Date(this.valueOf());
  //       date.setDate(date.getDate() + days);
  //       return date;
  //     };
  //   while (currentDate <= endDate) {
  //     dates.push(currentDate);
  //     currentDate = addDays.call(currentDate, 1);
  //   }
  //   return dates;
  // };


}
