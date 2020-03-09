import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })


  export class PaymentStatus{
      constructor (private http:HttpClient){}

      private baseUrl='/api/paymentstatus/';


     GetAll()
     {
        debugger
        return  this.http.get(this.baseUrl+'all');
     }

  }