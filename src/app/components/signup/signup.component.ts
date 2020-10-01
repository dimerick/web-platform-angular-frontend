import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { PlacesService } from '../../services/places.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/services/validators.service';
import { Place } from 'src/app/models/place';
import { LatLng, Layer } from 'leaflet';
import { faOm } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService, AuthService, PlacesService, CategoryService]
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  public resultUni: Place[];

  public url: string;
  public lat: number;
  public lon: number;
  public finishedGetLocation: boolean;
  public layers: Layer[];
  public degrees = [];
  public fieldsOfStudy = [];

  // @Input() modalActive: boolean;
  // @Output() eventSignUpModalClose = new EventEmitter<boolean>();

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private placesService: PlacesService,
    private categoryService: CategoryService

  ) {
    // this.modalActive = false;
    this.createForm();
    this.loadFormData();
    this.createListeners();
    this.resultUni = [];
    this.lat = 200;
    this.lon = 200;
    this.layers = [];
    this.getLocation();
  }


  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.signUpForm);
    let user: User = this.signUpForm.value;

    Swal.fire({
      allowOutsideClick: false, 
      icon: 'info', 
      text: 'Espere por favor...', 

    });

    Swal.showLoading();

    this._authService.singUp(user)
    .subscribe(
      resp => {
        console.log(resp);
        let idRegistrado = resp.id;

        let profile: Profile = this.signUpForm.value;
        profile.user = idRegistrado;
        profile.university_loc = `POINT(${this.lon} ${this.lat})`

        this._userService.createProfile(profile)
        .subscribe(
          resp => {
            console.log(resp);
            this.signUpForm.reset();
            // this.modalActive = false;
            Swal.fire({
              icon: 'success', 
              title: 'Registro exitoso'
    
            });
          }, 
          (err) => {
            console.log(err);
          }
        );

        
      }, 
      (err) => {
        console.log(err.error.email);
        if(err.error.email){
          Swal.fire({
            icon: 'error', 
            title: 'Error al registrarse', 
            text: err.error.email.join(',')
          });

        }

      }
    );

  }

  // closeModal(){
  //   this.modalActive = false;
  //   this.eventSignUpModalClose.emit(true);
  // }

  noMatchPasswords() {
    const password = this.signUpForm.get('password').value;
    const confirmPassword = this.signUpForm.get('confirmPassword').value;

    return (password === confirmPassword) ? false : true;
  }

  createForm() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      last_name: ['', Validators.required],
      email: ['',
        [Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')], this.validatorsService.existeEmail],
      degree: ['', Validators.required], 
      field_of_study: ['', Validators.required], 
      description: ['', Validators.required], 
      university: ['', Validators.required], 
      websites: ['', Validators.required],
      //university: ['', Validators.required],  
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.validatorsService.passwordMatch('password', 'confirmPassword')
    });
    console.log(this.signUpForm);
  }

  loadFormData() {
    this.signUpForm.setValue(
      {
        name: 'Erick',
        last_name: 'Saenz',
        email: 'ericksaenz37@outlook.com', 
        degree: '1', 
        field_of_study: '7', 
        description: 'Esta es una descripción', 
        university: 'Universidad de Temple', 
        websites: 'elatlas.org', 
        //university: '', 
        password: '123456',
        confirmPassword: '123456'
      }
    );
    this.getDegrees();
    this.getFieldsOfStudy();
  }

  createListeners() {

    this.signUpForm.valueChanges.subscribe(form => {
      //console.log(form);
      console.log(this.signUpForm);


    });

    //     this.signUpForm.get('university').valueChanges.subscribe(value =>{

    // this.resultUni = [];
    // if(value.length >= 3){

    //   this.placesService.getPlaces(value).subscribe(
    //     resp => {


    //       let data = JSON.parse(JSON.stringify(resp));

    //       for(let i=0;i < data.length;i++){
    //         console.log(data[i].description);
    //         let place = new Place(data[i].description, data[i].place_id);
    //         this.resultUni.push(place);
    //       }


    //     }
    //   );

    // }


    //     });
  }

  getLocation() {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {

        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;


      });
    } else {
      this.lat = 39.952583;
      this.lon = -75.165222;

    }

  }

  markerMoved(e: LatLng) {
    console.log(e);
    this.lat = e.lat;
    this.lon = e.lng;
  }

  getDegrees() {
    this.categoryService.getDegrees().subscribe(resp => {
console.log(resp);
      this.degrees = resp;
    },
      (err) => {
        console.log(err);
      });
  }

  getFieldsOfStudy() {
    this.categoryService.getFieldsOfStudy().subscribe(resp => {
console.log(resp);
      this.fieldsOfStudy = resp;
    },
      (err) => {
        console.log(err);
      });
  }

 

}
