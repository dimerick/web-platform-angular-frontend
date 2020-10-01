import { Component, OnInit } from '@angular/core';
import { circle, LatLng, Layer, point, Point } from 'leaflet';

@Component({
  selector: 'app-project-network',
  templateUrl: './project-network.component.html',
  styleUrls: ['./project-network.component.css']
})
export class ProjectNetworkComponent implements OnInit {

  public lat: number;
  public lon: number;
  public finishedGetLocation: boolean;
  public layers: Layer[];

  constructor() {
    this.lat = 200;
    this.lon = 200;
    this.getLocation();
    
   }

  ngOnInit(): void {
    this.layers = 
    [
      circle([ 6.15, -75.64 ], { radius: 10000 })
    ]
  }

  getLocation(){
  
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
    
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
             
        
      });
    }else{
      this.lat = 39.952583;
      this.lon = -75.165222; 
      
    }    
    
  }

  markerMoved(e: LatLng){
console.log(e);
  }

}
