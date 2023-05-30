import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username: string = "";
  autenticado: boolean = false;

  constructor() { }

  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  setAutenticado(autenticado: boolean): void {
    this.autenticado = autenticado;
  }

  isAutenticado(): boolean {
    return this.autenticado;
  }
}
