import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { ProjectNetworkComponent } from './components/project-network/project-network.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path: '', component: MapComponent}, 
  { path: 'registro', component: SignupComponent}, 
  { path: 'red-de-proyectos', component: ProjectNetworkComponent}, 
  { path: 'map', component: MapComponent}, 
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
