import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Locality } from '../models/classes/locality';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root'
})

export class LocalityService {
  constructor(
    private _http: HttpClient,
   
  ) { }

   baseUrl = '/api/locality';
  


  GetAll() {

    return this._http.get(this.baseUrl)
  }

  GetAllByPaging(page: number, page_size: number) {
    debugger

    return this._http.get(this.baseUrl + '/paging/all?page=' + page + '&page_size=' + page_size)
  }

  GetlocationByCity(id: number) {
    return this._http.get(this.baseUrl + '/cityId/' + id);
  }
  GetCitiesByCountries(countries: any) {
    return this._http.get(this.baseUrl + '/countries?countries=' + countries);
  }

  GetByName(city: string) {

    return this._http.get(this.baseUrl + '/byname?name=' + city);
  }

  GetlocationById(id: number) {
    return this._http.get(this.baseUrl + '/localityid/' + id);
  }

  Add(model: any) {
    model.IsActive = true;
    return this._http.post('/api/locality/create', model);
  }
  Update(id: number, model: any) {
    return this._http.post('/api/locality/update/' + id, model);
  }
  getlocation(id: number) {
    return this._http.get('/api/locality/' + id)
  }

  Delete(id: number) {
    debugger
    return this._http.post(this.baseUrl+'/delete/' + id, null)
  }

//   IsLocationExist(name: string, id: number) {
//     debugger
//     let promise = new Promise<{ [key: string]: any } | null>((resolve, reject) => {
//       this._http.post('/api/city/cityexist', { Name: name, Id: id }).subscribe((data: Data<string>) => {
//         if (data.returnCode == 0) {
//           resolve(null);
//         } else {
//           resolve({ exist: true });
//         }
//       });
//     });
//     return promise;
//   }

//   GetCitiesById(cities: any) {
//     debugger
//     const url = '/api/city/getby/cities?citiesID=' + cities;
//     return this._http.get(url);
//   }

}
