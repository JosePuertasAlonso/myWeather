import { Component, OnInit} from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { AuthService } from 'src/app/services/auth.service';
import { Place } from '../../services/place';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  ciudad: string = "";
  weatherData: any;
  principales: Place [] = [];
  favoritos: Place [] = [];
  nombre_favs: any [] = [];

  constructor(
    private weatherService: WeatherService,
    public authService: AuthService
    ) {}

  ngOnInit() {
    let ciudades=["Barcelona","El Cairo","Granada","Nueva York","Rio de Janeiro"];
    for (let i = 0; i < ciudades.length; i++) {
      this.cargarDatosCiudad(ciudades[i]);
    }
    console.log(this.principales);
    if(this.authService.isAutenticado()){
      this.cargarFavoritos(this.authService.usuario.id);
    }
  }

  buscarTiempo() {
    if (this.ciudad) {
      this.weatherService.obtenerTiempoCiudad(this.ciudad)
        .subscribe((data) => {
          this.weatherData = data;
        }, (error) => {
          console.error(error);
        });
    }
  }

  cargarDatosCiudad(ciudad: string): void {
    this.weatherService.cargarDatosCiudad(ciudad).subscribe(
      (place: Place) => {
        this.principales.push(place);
        console.log(place);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cargarFavoritos(idUser: string): void {
    this.weatherService.obtenerFavoritos(idUser).subscribe(
      (data: any[]) => {
        this.nombre_favs = data;
        console.log(this.nombre_favs);

        for (let i = 0; i < this.nombre_favs.length; i++) {
          this.cargarDatosFavorito(this.nombre_favs[i].nombre);
        }
      },
      (error) => {
        console.error('Error al obtener los favoritos:', error);
      }

    );
  }

  cargarDatosFavorito(favorito: any): void {
    this.weatherService.cargarDatosCiudad(favorito).subscribe(
      (place: Place) => {
        this.favoritos.push(place);
        console.log(place);
      },
      (error) => {
        console.error(error);
      }
    );
  }




}
