import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { NgxLeafletFullscreenModule } from '@runette/ngx-leaflet-fullscreen';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { SearchComponent } from './components/search/search.component';
import { CurrentUserComponent } from './components/current-user/current-user.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserPanelComponent } from './components/user-panel/user-panel.component';

import { appInitializer } from './_helpers/app.initializer';
import { JwtInterceptor} from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AuthService } from './services/auth.service';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { HeaderComponent } from './components/header/header.component';
import { LocationComponent } from './components/location/location.component';
import { ProjectNetworkComponent } from './components/project-network/project-network.component';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SearchComponent,
    CurrentUserComponent,
    SigninComponent,
    SignupComponent,
    UserPanelComponent,
    BusquedaComponent,
    HeaderComponent,
    LocationComponent,
    ProjectNetworkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    LeafletModule, 
    FontAwesomeModule, 
    HttpClientModule, 
    NgxLeafletFullscreenModule
  ],
  providers: [
    UserService,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
