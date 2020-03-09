import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class CarMake{
      constructor(private http:HttpClient){};
      
      private baseUrl='/api/carmake';


      GetAll() { 
        return this.http.get(this.baseUrl)
      }

   
      GetAllByPaging(page: number, Page_size: number, search:string){
        debugger
        var url = this.baseUrl + '/paging/all?page='+page+'&page_size='+Page_size
        if(search){
           url = this.baseUrl + '/paging/all?page='+page+'&page_size='+Page_size+'&search='+search;
        }
        
        return this.http.get(url)
      }


      

    
      Getbyid(id)
      {
          return this.http.get(this.baseUrl +'/' +id)
      }
    
      Create(model:any)
      {
          return this.http.post(this.baseUrl +'/create',model)
      }

      Delete(id:number)
      {
          return this.http.post(this.baseUrl+'/delete/'+id,null);
      }

      update(Id:number,model:any)
      {
          return this.http.post(this.baseUrl+ '/update/'+Id,model)
      }





  }