import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Global } from './global';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Profile } from '../models/profile';



@Injectable()
export class UserService{
    public url: string;
    constructor(
        private _http: HttpClient, 
        private _authservice: AuthService
    ){
        this.url = Global.url;

    }


    currentUser():Observable<User>{
        const userId = JSON.parse(atob(this._authservice.readToken().split('.')[1])).user_id;
        return this._http.get<User>(`${this.url}account/${userId}`)
            .pipe(map(user => {
                return user;
            }));
    }

    emailDisponible(email: string):Observable<any>{
        return this._http.get(
            `${this.url}email-disponible/${email}`
        ).pipe(
            map( resp => {
                return resp;
            }
            )
            
        );
    }

    createProfile(profile:Profile):Observable<Profile>{
        
        return this._http.post(
            `${this.url}profile`, 
            profile
        ).pipe(
            map( (resp: Profile) => {
                return resp;
            },
            )
        );

    }

}