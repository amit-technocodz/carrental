import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/classes/country';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root'
})

export class CountryService {
  constructor(
    private _http: HttpClient,
  ) {}
   baseUrl = '/api/country/';
 

  GetAll() {
    const url = this.baseUrl;
    return this._http.get(this.baseUrl)
  }

  GetAllByPaging(page: number, Page_size: number, search:string){
    debugger
    var url = this.baseUrl + '/paging/all?page='+page+'&page_size='+Page_size
    if(search){
       url = this.baseUrl + '/paging/all?page='+page+'&page_size='+Page_size+'&search='+search;
    }
    
    return this._http.get(url)
  }

  async GetAll1() {
    return [];
  }
  Add(model: Country) {
    model.IsActive = true;
    return this._http.post('/api/country/create', model);
  }
  Update(id: number, model: Country) {
    return this._http.post('/api/country/update/' + id, model);
  } 
  GetCountry(countryId: number) {
    debugger
    return this._http.get('/api/country/'+countryId)
  }

  GetById(Id)
  {
      return this._http.get(this.baseUrl+Id);
  }




  Delete(countryId: number) {
    return this._http.post('/api/country/delete/'+countryId,null)
  }

  GetCountriesById(countries:any)
  {
    debugger
    const url = this.baseUrl + '/countries?countries='+countries;
    return this._http.get(url);
  }

  GetCountriesByPackage()
  {
    const url = this.baseUrl + '/bypackage/all';
    return this._http.get(url)
  }

  GetByName(name: string)
  {
    return this._http.get(this.baseUrl+"/name/all/"+name)
  }

  IsCountryExist(name: string, id: number) {
    // tslint:disable-next-line:prefer-const
    let promise = new Promise<{ [key: string]: any } | null>((resolve, reject) => {
      this._http.post('/api/country/countryexist', { Name: name, Id: id }).subscribe((data: Data<string>) => {
        
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
