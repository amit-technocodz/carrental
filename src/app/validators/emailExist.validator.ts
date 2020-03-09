import { FormControl, Validators } from "@angular/forms";
import { UserService } from "../services/user.service";
export class EmailExistValidator implements Validators {
    static validate(formControl: FormControl,id:number, userservice:UserService): Promise<{ [key: string]: any } | null> {
        let promise = new Promise<{ [key: string]: any } | null>((resolve) => {
            //debugger
            userservice.IsEmailExist(formControl.value,id).then(function(data){
                resolve(data);
            })
        });
        return promise;
    }
} 