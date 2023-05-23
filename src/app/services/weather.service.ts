import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Place } from './place';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '37b81de24a316a9ab0780b781d48a33e';
  private baseUrl = 'https://api.openweathermap.org/data/2.5';
  private weatherIcons: { [key: string]: string } = {
    'Rain': 'fas fa-cloud-rain',
    'Clouds': 'fas fa-cloud',
    'Clear': 'far fa-sun',
    'Snow': 'fad fa-snowflakes',
    'Drizzle': 'fad fa-cloud-drizzle',
    'Thunderstorm': 'fad fa-thunderstorm',
    'Mist': 'fad fa-fog',
    'Haze': 'fad fa-smog',
    'Fog': 'fad fa-fog'
  };
  constructor(private http: HttpClient) {}

  obtenerTiempoCiudad(ciudad: string): Observable<any> {
    const url = `${this.baseUrl}/weather?q=${ciudad}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  cargarDatosCiudad(ciudad: string): Observable<Place> {
    const url = `${this.baseUrl}/weather?q=${ciudad}&appid=${this.apiKey}`;

    return this.http.get<any>(url).pipe(
      map((response: any) => {
        const place: Place = {
          name: response.name,
          temp_max: this.calcularTemp(response.main.temp_max),
          temp_min: this.calcularTemp(response.main.temp_min),
          temp: this.calcularTemp(response.main.temp),
          icon: this.weatherIcons[response.weather[0].main]
        };

        return place;
      })
    );
  }

  calcularTemp(temp: number): number {
    return Math.round(temp - 273);
  }
}
