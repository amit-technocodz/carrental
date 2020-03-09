import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/classes/city';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root'
})

export class CityService {
  constructor(
    private _http: HttpClient,
   
  ) { }

   baseUrl = '/api/city';
  


  GetAll() {

    return this._http.get(this.baseUrl)
  }

  GetAllByPaging(page: number, page_size: number) {
    debugger

    return this._http.get(this.baseUrl + '/paging/all?page=' + page + '&page_size=' + page_size)
  }

  GetCitiesByCountry(id: number) {
    return this._http.get(this.baseUrl + '/countryid/' + id);
  }
  GetCitiesByCountries(countries: any) {
    return this._http.get(this.baseUrl + '/countries?countries=' + countries);
  }

  GetByName(city: string) {

    return this._http.get(this.baseUrl + '/byname?name=' + city);
  }

  GetCityById(id: number) {
    return this._http.get(this.baseUrl + '/cityId/' + id);
  }

  Add(model: City) {
    model.IsActive = true;
    return this._http.post('/api/city/create', model);
  }
  Update(id: number, model: City) {
    return this._http.post('/api/city/update/' + id, model);
  }
  GetCity(cityId: number) {
    return this._http.get('/api/city/' + cityId)
  }

  Delete(cityId: number) {
    return this._http.post('/api/city/delete/' + cityId, null)
  }

  IsCityExist(name: string, id: number) {
    debugger
    let promise = new Promise<{ [key: string]: any } | null>((resolve, reject) => {
      this._http.post('/api/city/cityexist', { Name: name, Id: id }).subscribe((data: Data<string>) => {
        if (data.returnCode == 0) {
          resolve(null);
        } else {
          resolve({ exist: true });
        }
      });
    });
    return promise;
  }

  GetCitiesById(cities: any) {
    debugger
    const url = '/api/city/getby/cities?citiesID=' + cities;
    return this._http.get(url);
  }

}
