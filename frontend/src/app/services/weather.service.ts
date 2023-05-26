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

  public weatherIcons: { [key: string]: string } = {
    'Rain': 'wi wi-hail',
    'Clouds': 'wi wi-cloudy',
    'Clear': 'wi wi-day-sunny',
    'Snow': 'wi wi-snow',
    'Drizzle': 'wi wi-rain',
    'Thunderstorm': 'wi wi-thunderstorm',
    'Fog': 'wi wi-fog'
  };
  constructor(private http: HttpClient) {}

  obtenerTiempoCiudad(ciudad: string): Observable<any> {
    const url = `${this.baseUrl}/weather?q=${ciudad}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  obtenerTiempoCiudadHoras(ciudad: string): Observable<any> {
    const url = `${this.baseUrl}/forecast?q=${ciudad}&appid=${this.apiKey}`;
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
          feelLike: this.calcularTemp(response.main.feels_like),
          sunrise: this.calcularHora(response.sys.sunrise),
          sunset: this.calcularHora(response.sys.sunset),
          icon: this.weatherIcons[response.weather[0].main]
        };

        return place;
      })
    );
  }

  calcularTemp(temp: number): number {
    return Math.round(temp - 273);
  }

  calcularHora(hour: number): string {
    const date = new Date(hour * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();

    return hours + ':' + minutes.substr(-2);
  }
}
