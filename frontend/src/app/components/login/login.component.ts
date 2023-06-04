import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  existe = false;
  mostrarexito = false;
  mostrarerror = false;
  backgroundisabled = false;

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private authservice: AuthService,
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
          (error) => {
            console.error('Error al obtener el usuario:', error);
            const errorMessage = document.getElementById('errorMessage');
            if(errorMessage){
              errorMessage.style.color = 'red';
              errorMessage.textContent = 'Usuario no encontrado';
            }
          }
        );
      }
  }
  comprobarDisponibilidadUsuario(nombre: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.weatherService.obtenerUsuarios().subscribe(
        (usuarios) => {
          console.log('Usuarios:', usuarios);
          for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].username == nombre) {
              resolve(false);
              return;
            }
          }
          resolve(true);
        },
        (error) => {
          console.error('Error al obtener los usuarios:', error);
          reject(false);
        }
      );
    });
  }

  async agregarUsuario() {
    if(this.username != "" && this.password != ""){
    const usuario = {
      username: this.username,
      password: this.password,
    };

    const disponibilidad = await this.comprobarDisponibilidadUsuario(usuario.username);

    if (disponibilidad) {
      this.weatherService.agregarUsuario(usuario).subscribe(
        response => {
          console.log('Usuario agregado:', response);
          this.mostrarDialog(true);
        }
      );
    } else {
      this.mostrarDialog(false);
    }
  }else{
    const errorMessage = document.getElementById('errorMessageSignUp');
    if(errorMessage){
      errorMessage.style.color = 'red';
      errorMessage.textContent = 'Debe llenar todos los campos';
    }
  }
}


  mostrarDialog(exito: boolean) {
    if(exito){
      this.mostrarexito = true;
      this.backgroundisabled = true;
    }
    else{
      this.mostrarerror = true;
      this.backgroundisabled = true;
    }
  }
  ocultarDialog() {
      this.mostrarexito = false;
      this.mostrarerror = false;
      this.backgroundisabled = false;
      this.username = "";
      this.password = "";
      const errorMessage = document.getElementById('errorMessageSignUp');
      if(errorMessage){
        errorMessage.style.display = 'none';
      }
  }

}
