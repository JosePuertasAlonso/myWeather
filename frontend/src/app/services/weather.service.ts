import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Place } from './place';
import { Usuario } from './usuario';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '37b81de24a316a9ab0780b781d48a33e';
  private baseUrl = 'https://api.openweathermap.org/data/2.5';
  private springUrl = 'http://localhost:8080/api';

  public weatherIcons: { [key: string]: string } = {
    'Rain': 'wi wi-hail',
    'Clouds': 'wi wi-cloudy',
    'Clear': 'wi wi-day-sunny',
    'Snow': 'wi wi-snow',
    'Drizzle': 'wi wi-rain',
    'Thunderstorm': 'wi wi-thunderstorm',
    'Mist': 'wi wi-fog'
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
      switchMap((response: any) => {
        const image$ = this.obtenerImagenScrapping(response.name).pipe(
          map((imageResponse: any) => imageResponse[0].cityImg)
        );

        return image$.pipe(
          map((image: string) => {
            const place: Place = {
              name: response.name,
              temp_max: this.calcularTemp(response.main.temp_max),
              temp_min: this.calcularTemp(response.main.temp_min),
              temp: this.calcularTemp(response.main.temp),
              feelLike: this.calcularTemp(response.main.feels_like),
              sunrise: this.calcularHora(response.sys.sunrise),
              sunset: this.calcularHora(response.sys.sunset),
              icon: this.weatherIcons[response.weather[0].main],
              image: image
            };

            console.log("IMAGEN: " + place.image);
            return place;
          })
        );
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

  obtenerImagenScrapping(ciudad: string): Observable<any> {
    const url = `${this.springUrl}/ciudad/data/?city=${ciudad}`;
    return this.http.get(url);
  }

  cargarImagen(ciudad: string): any {
    this.obtenerImagenScrapping(ciudad).subscribe(
      (response: any) => {
        console.log("Respuesta del servidor:", response); // Agrega este console.log para verificar la respuesta
        return response[0].cityImg;
      }
    );
  }
  obtenerUsuario(username: string): Observable<any> {
    const url = `${this.springUrl}/usuarios/buscar/`+ username; // Reemplaza 'auth' con la URL adecuada para la autenticación en tu backend de Spring Boot
    return this.http.get(url)
  }

  cargarDatosUsuario(username: string): Observable<Usuario> {
    const url = `${this.springUrl}/usuarios/buscar/${username}`;

    return this.http.get<any>(url).pipe(
      map((response: any) => {
        const usuario: Usuario = {
          id: response.id,
          username: response.username,
          password: response.password,
          favorites: response.favorites
        };
        return usuario;
      })
    );
  }


  agregarUsuario(usuario: any): Observable<any> {
    return this.http.post("http://localhost:8080/api/usuarios", usuario);
  }

  actualizarUsuario(username : string, usuario:any): Observable<any> {
    var iduser: number=0;
    this.obtenerUsuario(username).subscribe(
      (response: any) => {
        iduser = response.id;
      },
    );

    return this.http.put("http://localhost:8080/api/usuarios/"+ iduser.toString(), usuario);
  }

  obtenerFavoritos(idUser: string): Observable<any> {
    const url = `${this.springUrl}/usuarios/${idUser}/favoritos`;
    return this.http.get(url)
  }
}
