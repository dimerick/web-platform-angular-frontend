import { Component, OnInit, Input } from '@angular/core';
import {Map, Control, DomUtil, ControlPosition, LatLng} from 'leaflet';
import { User } from '../../models/user';
import { faUser, faEnvelope, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css'], 
  providers: [UserService]
})
export class CurrentUserComponent implements OnInit {
  public custom: Control;
  @Input() position: ControlPosition;
  public signInActive: boolean;
  public signUpActive: boolean;
  public logged: boolean;
  public currentUser: User;
  public userPanelActive: boolean;
  faUser = faUser;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor(
    private _userservice: UserService
  ) {
    this.signInActive = false;
    this.signUpActive = false;
    this.logged = false;
    
   }

  ngOnInit(): void {
    this._userservice.currentUser().subscribe(user=>{
      console.log(user);
      this.currentUser = user;
      this.logged = true;
    });
    
  }

  @Input() set map(map: Map){
    if (map){
      let Custom = Control.extend({
        onAdd(map: Map) {
          return DomUtil.get('current-user');
        },
        onRemove(map: Map) {}
      });
      this.custom=new Custom({
          position: this.position
        }).addTo(map);
    
    }
  }

  openSignIn(){
    this.signInActive = true;
  }

  signInModalClose($event){
this.signInActive = false;
  }

  openSignUp(){
    this.signUpActive = true;
  }

  signUpModalClose($event){
this.signUpActive = false;
  }

  openUserPanel(){
this.userPanelActive = true;
  }
  closeUserPanel($event){
    this.userPanelActive = false;
  }
}
