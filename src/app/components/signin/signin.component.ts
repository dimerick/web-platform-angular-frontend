import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [AuthService]
})
export class SigninComponent implements OnInit {
    signInForm = new FormGroup({
    email : new FormControl('ericksaenz@outlook.com', [Validators.required, Validators.email]), 
    password : new FormControl('123456', Validators.required),
  });

  @Input() modalActive: boolean;
  @Output() eventSignInModalClose = new EventEmitter<boolean>();

  constructor(
    private _authService: AuthService
  ) {
    this.modalActive = false;
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.signInForm);
    let user: User = this.signInForm.value;

    Swal.fire({
      allowOutsideClick: false, 
      icon: 'info', 
      text: 'Iniciando Sesión...', 
      
    });

    Swal.showLoading();

    this._authService.singIn(user)
    .subscribe(
      resp => {
        Swal.close();
        console.log(resp);
        this.signInForm.reset();
        location.reload(true);
      }, 
      (err) => {
        console.log(err);
        if(err.error){
          Swal.fire({
            icon: 'error', 
            title: 'Error al autenticar', 
            text: err.error.detail, 
            
          });
          
        }
        
      }
    );
    
  }

  closeModal(){
    this.modalActive = false;
    this.eventSignInModalClose.emit(true);
  }

  

}
