import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }


  usuario = new FormGroup({

    user: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),

    pass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),

  });

  recuperapass() {
    this.router.navigate(['/recuperapass']);
  }

  navegahome() {

    let setData: NavigationExtras = {

      state: {

        user: this.usuario.value.user,

        id: this.usuario.value.pass

      }

    };
    var mensaje = "";
    if (this.usuario.value.user === "jorge" && this.usuario.value.pass === "1234") {
      this.router.navigate(['/home-alumno'], setData);
    } else if (this.usuario.value.user === "diego" && this.usuario.value.pass === "1234") {
      this.router.navigate(['/home'], setData);
    } else {
      mensaje = 'Usuario o Contraseña Incorrecto'
      this.alertaError('Error al Iniciar Sesion', mensaje);
    }
  }

  async alertaError(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }



}
