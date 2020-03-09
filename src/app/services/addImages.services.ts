import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class UploadImages{
    constructor (private http:HttpClient){}

    private baseUrl='/api/uploadimage';

    Save(model:any)
    {
        debugger
      return  this.http.post(this.baseUrl+'/upload',model);
    }

  }