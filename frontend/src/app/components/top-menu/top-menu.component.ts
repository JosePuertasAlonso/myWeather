import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Router } from '@angular/router'; // Importa el Router
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
  ciudad: string = "";
  weatherData: any;
  desplegable = false;
  mostrardialog = false;

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    public authService: AuthService
    ) {}

    buscarTiempo() {
    if (this.ciudad) {
      this.weatherService.obtenerTiempoCiudad(this.ciudad)
        .subscribe((data) => {
          this.weatherData = data;
          this.router.navigate(['/place/'+ this.ciudad]); // Reemplaza '/ruta-destino' con la ruta a la que deseas redirigir
        }, (error) => {
          console.error(error);
        });

    }
  }


  mostrarDialog() {
    this.mostrardialog = true;
  }
  ocultarDialog() {
    this.mostrardialog = false;
  }

  cerrarSesion() {
    this.authService.autenticado = false;
    this.ocultarDialog();
  }
}
