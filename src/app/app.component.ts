import { Component, OnInit } from '@angular/core';
import { Map, tileLayer } from 'leaflet';

import * as L from 'leaflet';
import * as clusterData from '../assets/data.json';


// const iconRetinaUrl = 'marker-icon-2x.png';
const iconRetinaUrl = 'marker-icon.png';
const iconUrl = 'marker-icon.png';
const shadowUrl = 'marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'cluster-map';
  map: Map;
  propertyList = [];

  ngOnInit() {

    this.map = new Map('mapId').setView([40.4169019, -3.7056721], 14);

    tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    clusterData.Cluster.forEach((cluster) => {
      L.marker([cluster.latitud, cluster.longitud], { title: `${cluster.id_cluster}` })
        .bindPopup(`<b>${cluster.id_cluster}</b>`)
        .addTo(this.map)
        .openPopup();

    });

  }

}
