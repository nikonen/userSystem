import { AbstractControl } from "@angular/forms";

export function passwordMatch
(control: AbstractControl):{[key: string]: boolean}  {
     
      const password = control.get('password');
     const passwordAgain = control.get('passwordAgain');
       
    // If FormControl objects don't exist, return null
    if (!password || !passwordAgain) return null;
     
    //If they are indeed equal, return null
    if (password.value === passwordAgain.value) {
      return null;
    }
   //Else return false
   return {
      mismatch: true };
   }