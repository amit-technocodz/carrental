import { AbstractControl } from '@angular/forms';
export function passwordMatch(control: AbstractControl):{[key: string]: boolean}  {
    //debugger
    //Grab pwd and confirmPwd using control.get
    const pwd = control.get('Password');
     const confirmPwd = control.get('ConfirmPassword');
       
    // If FormControl objects don't exist, return null
    if (!pwd || !confirmPwd) return null;
    
    //If they are indeed equal, return null
    if (pwd.value === confirmPwd.value) {
      return null;
    }
    confirmPwd.setErrors({"mismatch":true})
   //Else return false
   return {
      mismatch: true };
   }