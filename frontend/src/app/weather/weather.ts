import { Component, AfterViewInit, signal } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { icon, Marker } from 'leaflet';
import { environment } from '../../environments/environment';

const iconDefault = icon({
  //to solve leaflet bug
  iconRetinaUrl: 'assets/marker-icon-2x.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.html',
  styleUrls: ['./weather.css'],
})
export class Weather implements AfterViewInit {
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

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

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
      this.fetchWeather(lat, lon);
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

  fetchWeather(lat: string, lon: string) {
    this.loading.set(true);
    const url = `${this.apiUrl}/api/weather?lat=${lat}&lon=${lon}`;
    this.http.get(url).subscribe({
      next: (res: any) => {
        this.data.set(res);
        this.loading.set(false);
      },
    });
  }
}
