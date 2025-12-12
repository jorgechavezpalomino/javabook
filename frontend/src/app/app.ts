import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WeatherComponent } from './weather/weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WeatherComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend bait');
}
