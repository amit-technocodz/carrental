import { FormControl, Validators } from "@angular/forms";
//import { CountryService } from "../services/country.service";
export class CountryExistValidator implements Validators {
    static validate(formControl: FormControl,id:number, countryservice:any): Promise<{ [key: string]: any } | null> {
        let promise = new Promise<{ [key: string]: any } | null>((resolve) => {
            //debugger
            countryservice.IsCountryExist(formControl.value,id).then(function(data){
                resolve(data);
            })
        });
        return promise;
    }
} 