import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{User} from '../models/user';
import {Data} from '../models/data';

@Injectable({
    providedIn: 'root'
  })
  export class UserService{
    constructor(private http:HttpClient) { }

    GetAll(page: number, pageSize: number, search: string, AgencyId: number) {
        // tslint:disable-next-line:triple-equals
        var url = '/api/user?page=' + page + '&page_size=' + pageSize;
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
        if (AgencyId) {
          url = url + '&agency=' + AgencyId;
        }
        return this.http.get(url);
      }
    
      GetAllByAgency(page: number, pageSize: number, search: string, Agency: number) {
        debugger;
        var url = '/api/user?page=' + page + '&page_size=' + pageSize;
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
        if (Agency) {
          url = url + '&agency=' + Agency;
        }
        return this.http.get(url);
      }

      GetUserById(id: number) {
        return this.http.get('/api/user/' + id);
      }
    
      Add(model: User) {
        model.IsActive = true;
        return this.http.post('/api/user/create', model);
      }

      IsEmailExist(email: string, id: number) {
        let promise = new Promise<{ [key: string]: any } | null>((resolve, reject) => {
          this.http.post('/api/user/emailexist', { Email: email, Id: id }).subscribe((data: Data<string>) => {
            if (data.returnCode == 0) {
              resolve(null);
            } else { 
              resolve({ exist: true });
            }
          });
        });
        return promise;
      }
      
      Login(model: any) {
        return this.http.post('/api/user/login', model);
      }

      GetAllVender()
      {
        debugger
        return this.http.get('/api/user/venderall');
      }



  }