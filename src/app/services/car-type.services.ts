import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cartype } from "../models/car-type.model";


@Injectable({
    providedIn: 'root'
  })


  export class CarType{
      constructor (private http:HttpClient){}

      private baseUrl='/api/cartype/';


     GetAll()
     {
        debugger
        return  this.http.get(this.baseUrl+'all');
     }

     GetById(Id)
     {
         return this.http.get(this.baseUrl+Id);
     }

     update(model:any)
     {
         return this.http.post(this.baseUrl+'update',model);
     }

     delete(Id)
     {
         return this.http.post(this.baseUrl+'delete/'+Id,null);
     }

     Create(model:any)
     {
         return this.http.post(this.baseUrl+'save',model);
     }
  }