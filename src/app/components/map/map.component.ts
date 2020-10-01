/// <reference types='@runette/leaflet-fullscreen' />
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, tileLayer, latLng, geoJSON, divIcon, Marker, Circle, circle, marker, layerGroup, Icon, LatLng, DragEndEvent, FullscreenOptions } from 'leaflet';




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options: MapOptions;
  @Input() layersControl = {
    baseLayers: {
      'CartoDB DarkMatter': tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' }),
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }),
      'World Imagery': tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' })
    },     
    overlays: {
      
    }
  };

  @Input() layersControlOptions = {
    position: 'bottomright', 

  };

  public map: Map;
  @Input() zoom: number;
  @Input() layers: Layer[];
  @Input() lat: number;
  @Input() lon: number;
  @Input() height: number;
  @Input() markerActive: boolean;
  @Input() featureCollection: Layer[];
  @Output() markerMovedEvent: EventEmitter<LatLng> = new EventEmitter;
  public fullscreenOptions: FullscreenOptions = {
    position: 'topleft',
    pseudoFullscreen: false,
    title: {true:'Exit Fullscreen',
            false: 'View Fullscreen',
            }
  };
  
  

  constructor() { 

    this.lat = 6.5;
    this.lon = -75.4;
        
  }

  ngOnInit() {
    this.initializeMap();
    if(this.markerActive){
      this.createMarker();
    }
    
    
    this.options = {
      layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 19,
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })],
      zoom:this.zoom,
      center: latLng(this.lat, this.lon), 
      zoomControl: false
};


  }

  ngOnDestroy() {
    this.map.clearAllEventListeners;
    this.map.remove();
  };

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);

    // var geoPoint: any = {
    //   "type": "Feature",
    //   "geometry": {
    //     "type": "Point",
    //     "coordinates": [-75.53040504455568, 6.263768840495587]
    //   },
    //   "properties": {
    //     "name": "Dinagat Islands"
    //   }
    // };

    var customControl =  Control.extend({

      options: {
        position: 'bottomright'
      },
    
      onAdd: function (map) {
        var container = DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    
        container.style.backgroundColor = 'white';     
        container.style.backgroundImage = "url(https://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)";
        container.style.backgroundSize = "40px 40px";
        container.style.width = '40px';
        container.style.height = '40px';
    
        container.onclick = function(){
          console.log('buttonClicked');
        }
    
        return container;
      }
    });


    

    this.map.addControl(new customControl());
    

    // var puntos = geoJSON(geoPoint, {onEachFeature: this.onEachFeature}).addTo(this.map);
    // this.layersControl.overlays = {
    //   '<b>Puntos</b>': puntos
    // };
  }

  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

//   onEachFeature(feature, layer) {
//     // does this feature have a property named popupContent?
//     var size = 15;
//     var myIcon = divIcon({
//       className: 'div-icon icon-red', 
//       iconSize: [size, size], 
//       iconAnchor: [size/2, size/2]
//     });
//     var punto = marker(latLng(-75.55040504455568, 6.383768840495587)).setIcon(myIcon);
//     layer.setIcon(myIcon);
// }



createMarker(){


  this.layers.push(marker([this.lat, this.lon], {
    icon: new Icon({
      iconSize: [ 32, 39 ],
      iconAnchor: [ 12, 39 ],
      iconUrl: 'assets/images/map-icon-red.png',
      }),
    draggable: true,
  }).on('dragend', (e)=>{
    console.log(e);
    this.markerMoved(e);      
    }));
    
  

  }

markerMoved(e: DragEndEvent){
  console.log("lat - long", e.target.getLatLng().lat, "-", e.target.getLatLng().lng);
  this.markerMovedEvent.emit(latLng(e.target.getLatLng().lat, e.target.getLatLng().lng));
}

initializeMap(){
  let map = document.getElementById("map");
  map.style.height = `${this.height}px`;
}

}
