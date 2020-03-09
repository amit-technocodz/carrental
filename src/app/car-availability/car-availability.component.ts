import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { service } from 'src/app/services/service';

@Component({
  selector: 'app-car-availability',
  templateUrl: './car-availability.component.html',
  styleUrls: ['./car-availability.component.css']
})
export class CarAvailabilityComponent implements OnInit {
  searchForm = new FormGroup({
    VendorId: new FormControl(''),
    Date: new FormControl(''),
  });

  vendorList: any = [];
  availableList: any = [];

  constructor(public _service: service) { }

  ngOnInit() {
    this.getAllVendors();
  }

  getAllVendors() {
    this._service.userservice.GetAllVender().subscribe((result: any) => {
      this.vendorList = result.data;
    })
  }

  searchAvailability(model) {
    let tmpresult = [];
    const map = new Map();
    var TDate = model.Date;

    var date = model.Date.getUTCFullYear() + '-' +
      ('00' + (model.Date.getUTCMonth() + 1)).slice(-2) + '-' +
      ('00' + model.Date.getUTCDate()).slice(-2);
console.log(date);
    this._service.carrental.getAvailableCars(model.VendorId, date).subscribe((result: any) => {
      result.data.forEach((element: any) => {
        let tempRegId = element.CarRegistrationId;
        let tempRentals = result.data.filter(x => x.CarRegistrationId == tempRegId);
        let status = "";
        tempRentals.forEach(tRental => {
          var tbookingFrom = tRental.BookingFrom.split(/[- :]/);
          var tbookingTo = tRental.BookingTo.split(/[- :]/);
          var bookingFrom = new Date(Date.UTC(tbookingFrom[0], tbookingFrom[1]-1, tbookingFrom[2], tbookingFrom[3], tbookingFrom[4], tbookingFrom[5]));
          var bookingTo = new Date(Date.UTC(tbookingTo[0], tbookingTo[1]-1, tbookingTo[2], tbookingTo[3], tbookingTo[4], tbookingTo[5]));
          debugger;
          if(TDate > bookingFrom && TDate < bookingTo)
          status = "Booked";
        });
        if (!map.has(element.CarRegistrationId)) {
          map.set(element.CarRegistrationId, true);    // set any value to Map
          this.availableList.push({
            CarType: element.CarRegistration.CarType.Name,
            CarModel: element.CarRegistration.CarModel.Name,
            PlateNo: element.CarRegistration.PlateNo,
            Image: element.CarRegistration.SmallImageType,
            Status: status
          });
        }
      });
    });
  }
}
