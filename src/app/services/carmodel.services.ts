import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarModel } from '../models/carmodel';
import { Data } from '../models/data';


@Injectable({
  providedIn: 'root'
})

export class CarModelService {
  constructor(
    private _http: HttpClient,
  ) {}
   baseUrl = '/api/carmodel/';
 

  GetAll() {
    const url = this.baseUrl;
    return this._http.get(this.baseUrl)
  }

  GetAllByPaging(page: number, Page_size: number){
    debugger
    var url = this.baseUrl + 'paging/all?page='+page+'&page_size='+Page_size;
    return this._http.get(url)
  }

  async GetAll1() {
    return [];
  }
  Add(model: CarModel) {
    model.IsActive = true;
    return this._http.post(this.baseUrl+'create', model);
  }
  Update(id: number, model: CarModel) {
    return this._http.post(this.baseUrl+'update/' + id, model);
  } 
  GetById(Id)
  {
      return this._http.get(this.baseUrl+Id);
  }

  Delete(id: number) {
    return this._http.post(this.baseUrl+'delete/'+id,null)
  }


  IsCarmodelExist(name: string, id: number) {
    // tslint:disable-next-line:prefer-const
    let promise = new Promise<{ [key: string]: any } | null>((resolve, reject) => {
      this._http.post(this.baseUrl+'carmodelexist', { Name: name, Id: id }).subscribe((data: Data<string>) => {
        
        if (data.returnCode == 0) {
          resolve(null);
        } else {
          resolve({exist: true});
        }
      });
    });
    return promise;
  }
}
