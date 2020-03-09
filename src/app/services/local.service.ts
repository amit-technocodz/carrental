import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(
    private route: ActivatedRoute
  ) { }

  private checkout = [];
  private countriesAndCities = [];
  private liClass: string;
  private TotalTreveler=[];

  AddCheckOutDetail(model: any) {
    this.checkout = [];
    this.checkout.push(model);
    localStorage.setItem("checkout", JSON.stringify(this.checkout));
  }
  GetCheckOutDetail() {
    this.checkout = JSON.parse(localStorage.getItem("checkout"));
    return this.checkout;
  }

  AddCountriesAndCities(model: any) {
    this.countriesAndCities = [];
    this.countriesAndCities.push(model);
    localStorage.setItem("countriesAndCities", JSON.stringify(this.countriesAndCities));
  }

  GetCountriesAndCities() {
    this.countriesAndCities = JSON.parse(localStorage.getItem("countriesAndCities"));
    localStorage.removeItem("countriesAndCities");
    return this.countriesAndCities;
  }

  AddHtmlClasses(value: string) {
    this.liClass = value
  }
  AddTotalTreveler(model:any){
    this.TotalTreveler=[]
    this.TotalTreveler=model
    localStorage.setItem("TotalTreveler",JSON.stringify(this.TotalTreveler))

  }

  GetTotalTrevler()
  {
    this.TotalTreveler=JSON.parse(localStorage.getItem("TotalTreveler"));
    //localStorage.removeItem("TotalTreveler");
    return this.TotalTreveler;
  }

  GetHtmlClasses() {

  }
}
