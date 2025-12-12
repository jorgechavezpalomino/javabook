import { Component, AfterViewInit, signal } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.html',
  styleUrls: ['./weather.css'],
})
export class WeatherComponent implements AfterViewInit {
  lat = signal('');
  lon = signal('');

  loading = signal(false);

  data = signal({
    city: '',
    temperature: '',
    humidity: '',
  });

  map!: L.Map;
  marker!: L.Marker;

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat.toFixed(6);
      const lon = e.latlng.lng.toFixed(6);

      this.lat.set(lat);
      this.lon.set(lon);

      this.placeMarker(lat, lon);
    });
  }

  placeMarker(lat: string, lon: string) {
    const latNum = Number(lat);
    const lonNum = Number(lon);

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([latNum, lonNum]).addTo(this.map);
    this.map.setView([latNum, lonNum], 5);
  }
}
