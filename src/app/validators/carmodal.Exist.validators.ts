import { FormControl, Validators } from "@angular/forms";
//import { CountryService } from "../services/country.service";
export class CarModelExistValidator implements Validators {
    static validate(formControl: FormControl,id:number, carmodelservice:any): Promise<{ [key: string]: any } | null> {
        let promise = new Promise<{ [key: string]: any } | null>((resolve) => {
            //debugger
            carmodelservice.IsCarmodelExist(formControl.value,id).then(function(data){
                resolve(data);
            })
        });
        return promise;
    }
} 