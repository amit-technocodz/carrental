import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CarRental { 
  constructor(
    private _http: HttpClient,
  ) {}
   baseUrl = '/api/carrental/';
 

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
    debugger
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

  getDates(id: number){
    return this._http.get(this.baseUrl+'getDates/'+id);
  }

  getAvailableCars(id: number, date: any){
    var requests = this.baseUrl+'getAvailableCars/'+id+"/"+date;
    console.log(requests);
    return this._http.get(this.baseUrl+'getAvailableCars/'+id+"/"+date);
  }
}
