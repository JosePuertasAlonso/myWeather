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
  autenticado: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private authservice: AuthService
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
            if(response && response.length > 0 && response[0].username==username && response[0].password == password){
              this.authservice.autenticado = true;
              this.authservice.username = username;
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

}
