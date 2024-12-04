import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthserviceService } from '../service/authservice.service';
import { ConsumoapiService } from '../service/consumoapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private consumoapi: ConsumoapiService,private router: Router, private alertController: AlertController, private authService: AuthserviceService) { }

  ngOnInit() {
  }


  usuario = new FormGroup({

    user: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),

    pass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),

  });

  recuperapass() {
    this.router.navigate(['/recuperapass']);
  }

  // navegahome() {

  //   let setData: NavigationExtras = {

  //     state: {

  //       user: this.usuario.value.user,

  //       id: this.usuario.value.pass

  //     }
  //   };

  //   const loginMap: {[key: string]: string}={
  //     'prof:1234': '/home-profesor',
  //     'diego:1234': '/home-profesor',
  //     'alumn:1234': '/home-alumno',
  //     'jorge:1234': '/home-alumno',

  //   };
  //   const userkeypass = `${this.usuario.value.user}:${this.usuario.value.pass}`

  //   if(loginMap[userkeypass]){
  //     this.authService.login();
  //     this.router.navigate([loginMap[userkeypass]], setData);
  //   }else{
  //     this.alertaError('Error al Iniciar Sesion', 'Usuario o Contraseña Incorrecto');
  //   }
  // }

  async alertaError(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }


// funcion que me permite validar a los usuarios
  login(){
    this.consumoapi.postLogin(this.usuario.value.user, this.usuario.value.pass).subscribe((resp)=>{
      let tperfil: number = resp.tipoPerfil;
      let setData: NavigationExtras ={
        state: {
          id: resp.id,
          nombre: resp.nombre,
          correo: resp.correo,
          perfil: resp.tipoPerfil
        }
      };
      if (tperfil ==1) {
        this.authService.login();
        this.router.navigate(['/home-profesor'], setData);
      }else if (tperfil==2) {
        this.authService.login();
        this.router.navigate(['/foto-registro'], setData);
      }
      
    },(error)=>{
      this.alertaError("ERROR", "Usuario o contraseña Incorrecto ")
    });
    ;
}


























}



