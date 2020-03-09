import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })


  export class BookingStatus{
      constructor (private http:HttpClient){}

      private baseUrl='/api/bookingstatus/';


     GetAll()
     {
        debugger
        return  this.http.get(this.baseUrl+'all');
     }

  }