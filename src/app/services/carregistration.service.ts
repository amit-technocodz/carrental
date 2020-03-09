import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarRegistration } from '../models/carregistration';


@Injectable({
  providedIn: 'root'
})

export class CarRegistrationService {
  constructor(
    private _http: HttpClient,
  ) {}
   baseUrl = '/api/carregistation/';
 

  GetAll() {
    const url = this.baseUrl;
    return this._http.get(this.baseUrl)
  }

  GetAllByPaging(page: number, Page_size: number){
    debugger
    var url = this.baseUrl + 'paging/all?page='+page+'&page_size='+Page_size;
    return this._http.get(url)
  }

  Add(model: any) {
    model.IsActive = true;
    return this._http.post(this.baseUrl+'create', model);
  }
  Update(id: number, model: any) {
    return this._http.post(this.baseUrl+'update/' + id, model);
  } 
  GetById(Id)
  {
      return this._http.get(this.baseUrl+Id);
  }

  Delete(id: number) {
    return this._http.post(this.baseUrl+'delete/'+id,null)
  }

}
