import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private autenticador = false;

  constructor() { }

  isLoggerinto(){
    return this.autenticador;
  }

  login(){
    return this.autenticador = true;
  }

  logout(){
    this.autenticador = false;
  }

}
