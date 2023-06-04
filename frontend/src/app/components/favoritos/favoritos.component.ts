import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Place } from 'src/app/services/place';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit{
  favoritos: Place [] = [];
  nombre_favs: any [] = [];

  constructor(
    private weatherService: WeatherService,
    public authService: AuthService
    ) {}
  ngOnInit() {
    this.cargarFavoritos(this.authService.usuario.id);
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
