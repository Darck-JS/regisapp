import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-foto-registro',
  templateUrl: './foto-registro.page.html',
  styleUrls: ['./foto-registro.page.scss'],
})
export class FotoRegistroPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }


  public alertButtons = [
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(ev: CustomEvent) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
    this.router.navigate(['/home-alumno'])
  }




}
