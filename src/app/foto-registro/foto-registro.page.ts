import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-foto-registro',
  templateUrl: './foto-registro.page.html',
  styleUrls: ['./foto-registro.page.scss'],
})
export class FotoRegistroPage implements OnInit {

  curso = this.router.getCurrentNavigation()?.extras.state?.['curso'];
  usuario = this.router.getCurrentNavigation()?.extras.state?.['user'];

  constructor(private activerouter: ActivatedRoute, private router: Router, private alertController: AlertController) {
    this.activerouter.queryParams.subscribe(params => {

    });
  }

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


public imageSrc: string | undefined = '';

async takePicture() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
  const imageUri = image.webPath;
  this.imageSrc = imageUri;
}

}
