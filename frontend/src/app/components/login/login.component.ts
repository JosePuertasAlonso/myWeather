import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private authservice: AuthService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    const imageBt = document.querySelector('.img__btn');
    const mov = document.querySelector('.container')
    if(imageBt && mov){
      imageBt.addEventListener('click',
      function() {
        mov.classList.toggle('s--signup');
      });
    }
  }
  autenticarUsuario(username : string, password:string): void {
      if (username) {
        this.weatherService.obtenerUsuario(username).subscribe(
          (response: any) => {
            console.log('Usuario obtenido:', response);
            if(response && response.username==username && response.password == password){
              this.authservice.autenticado = true;
              this.authservice.username = username;
              this.authservice.usuario = response;
              this.router.navigateByUrl('/main');
            }
            else{
              const errorMessage = document.getElementById('errorMessage');
              if(errorMessage){
                errorMessage.style.color = 'red';
                errorMessage.textContent = 'Credenciales incorrectas';
              }
              this.authservice.autenticado = false;
            }
          },
        );
      }
  }

  agregarUsuario() {
    const usuario = {
      username: this.username,
      password: this.password,
    };

    this.weatherService.agregarUsuario(usuario).subscribe(
      response => {
        console.log('Usuario agregado:', response);
      },
      error => {
        console.error('Error al agregar el usuario:', error);
        if (error.error === 'El username ya está en uso') {
        } else {
        }
      }
    );
  }



}
