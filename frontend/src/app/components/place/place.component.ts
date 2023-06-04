import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { Place } from '../../services/place';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit{
  place: Place | undefined;
  apiPlace:any;
  apiPlaceHours:any;
  imagenUrl: any;
  isFavorito: boolean = false;
  idPlace: any;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private location: Location,
    public authService: AuthService
    ) { }

  ngOnInit() {
    this.getPlace();
    this.getApiPlace();
    this.obtenerImagen();

  }


  getPlace(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      if (name) {
        this.weatherService.cargarDatosCiudad(name)
          .subscribe((place: Place) => {
            this.place = place;
            if(this.authService.isAutenticado()){
              this.comprobarFavoritos(this.authService.usuario.id);
            }
          }, (error) => {
            console.error(error);
          });
      }
    });

  }
  getApiPlace(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      if (name) {
      this.weatherService.obtenerTiempoCiudad(name).subscribe(
        (data) => {
          this.apiPlace = data; // Guarda los datos en la variable apiPlace
          console.log(this.apiPlace); // Imprime los datos en la consola
        },
        (error) => {
          console.error(error); // Maneja los errores en caso de que ocurran
        }
      );
      this.weatherService.obtenerTiempoCiudadHoras(name).subscribe(
        (data) => {
          this.apiPlaceHours = data; // Guarda los datos en la variable apiPlace
          console.log(this.apiPlaceHours); // Imprime los datos en la consola
        },
        (error) => {
          console.error(error); // Maneja los errores en caso de que ocurran
        }
      );
    }
    });
  }
  calcularTemperatura(temp: number): string {
    return String(this.weatherService.calcularTemp(temp)+ 'ºC');
  }
  obtenerIcono(weather:string):string{
    return this.weatherService.weatherIcons[weather];
  }
  goBack(): void {
    this.location.back();
  }
  obtenerImagen(): void {
    this.route.paramMap.subscribe(params => {
      const city = params.get('name');
      console.log(city);
      if (city) {
        this.weatherService.obtenerImagenScrapping(city).subscribe(
          (response: any) => {
            console.log("Respuesta del servidor:", response); // Agrega este console.log para verificar la respuesta
            this.imagenUrl = response[0].cityImg;
            console.log("MI IMAGEN", this.imagenUrl);
          },
          (error: any) => {
            console.error(error);
          }
        );
      }
    });
  }

  añadirCiudadFavoritos(ciudad: string): void {

  }

  comprobarFavoritos(id_user:any){

      this.weatherService.obtenerFavoritos(id_user).subscribe(
        (data: any[]) => {
          console.log("Favoritos:", data);
          this.isFavorito = false;
          for (let i = 0; i < data.length; i++) {
            if(this.place && data[i].nombre == this.place.name){
              this.isFavorito = true;
              this.idPlace = data[i].id;
            }
          }
        },
        (error) => {
          console.error('Error al obtener los favoritos:', error);
        }

      );
  }

  anadirFavorito(){
    if(this.place){
      const ciudad = {
        nombre: this.place.name,
      };
    this.weatherService.anadirFavorito(this.authService.usuario.id,ciudad).subscribe(
      response => {
        console.log('Ciudad agregado a favoritos:', response);
        this.getPlace();
      },
      error => {
        console.error('Error al agregar el ciudad a favoritos:', error);
      }
    );
    }
  }

  quitarFavorito(){
    this.weatherService.quitarFavorito(this.authService.usuario.id,this.idPlace).subscribe(
      response => {
        console.log('Ciudad eliminada de favoritos:', response);
        this.getPlace();
      },
      error => {
        console.error('Error al eliminar la ciudad de favoritos:', error);
      }
    );
  }
}
