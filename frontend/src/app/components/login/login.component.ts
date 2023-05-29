import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usernameOrEmail: string = "";
  password: string = "";

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
  login(): void {
    this.http.post<any>('/login', { usernameOrEmail: this.usernameOrEmail, password: this.password })
      .subscribe(data => {
        if (data.success) {
          // El inicio de sesión fue exitoso, realizar acciones adicionales (por ejemplo, redireccionar a una página de inicio)
          console.log("Inicio de sesión exitoso");
          // Aquí puedes redirigir al usuario a la página de inicio o realizar otras acciones necesarias
        } else {
          // El inicio de sesión falló, mostrar un mensaje de error
          console.log("Inicio de sesión fallido");
          // Aquí puedes mostrar un mensaje de error al usuario o realizar otras acciones necesarias
        }
      }, error => {
        console.error("Error en la solicitud:", error);
      });
  }
}
