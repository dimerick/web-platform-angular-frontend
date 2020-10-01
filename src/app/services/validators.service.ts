import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

interface ErrorValidate{
  [s:string]:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(
    private userService: UserService
  ) { }

  public existeEmail = (control: FormControl):Promise<ErrorValidate> | Observable<ErrorValidate> => {
    
    return new Promise((resolve, reject)=>{

      this.userService.emailDisponible(control.value).subscribe(
        resp => {        
          resolve({existe: true});
        }, 
        (err) => {
          if(err.status == 404){
            resolve(null);
          }
        }
      );

    });

    
  }
  
  passwordMatch(passwordName: string, confirmPasswordName: string){
    
    return (formGroup: FormGroup) => {
const passwordControl = formGroup.controls[passwordName];
const confirmPasswordControl = formGroup.controls[confirmPasswordName];

if(passwordControl.value === confirmPasswordControl.value){
  confirmPasswordControl.setErrors(null);
}else{
  confirmPasswordControl.setErrors({noMatchPassword: true});
}

    }
  

  
}
}