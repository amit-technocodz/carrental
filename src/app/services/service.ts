import { Injectable } from '@angular/core';
import {CarType} from '../services/car-type.services'
import{UploadImages} from'../services/addImages.services'
import {UserService} from '../services/user.service'
import {LocalService} from '../services/local.service'
import {CountryService} from '../services/country.service'
import {CityService} from '../services/city.serviec'
import {LocalityService} from '../services/locality.service'
import {CarMake} from '../services/carmake.service'
import{ CarModelService } from '../services/carmodel.services'
import {CarRegistrationService} from '../services/carregistration.service'
import{CarRentalPrice} from '../services/carrentalprice.services'
import{CarRental} from '../services/carrental.service'
import{PaymentStatus} from '../services/paymentstatus.services'
import { BookingStatus } from '../services/bookingstatus.services';
 

@Injectable({
    providedIn:'root'
})

export class service{
    constructor( 
        public cartype:CarType,
        public uploadImage:UploadImages,
        public userservice :UserService,
        public localservice:LocalService,
        public localityservice:LocalityService,
        public cityservice:CityService,
        public countryservice:CountryService,
        public carmakeservice:CarMake,
        public carmodelservice:CarModelService,
        public carregistrationservice:CarRegistrationService,
        public carrentalpriceservice:CarRentalPrice,
        public carrental:CarRental,
        public paymentstatus:PaymentStatus,
        public bokingstatus:BookingStatus
         ){
             
         }
}