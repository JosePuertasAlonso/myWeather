import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { Place } from '../../services/place';
import { Location } from '@angular/common';

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


  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private location: Location
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

}
