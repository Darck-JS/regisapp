import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-foto-registro',
  templateUrl: './foto-registro.page.html',
  styleUrls: ['./foto-registro.page.scss'],
})
export class FotoRegistroPage implements OnInit {

  curso = this.router.getCurrentNavigation()?.extras.state?.['curso'];
  usuario = this.router.getCurrentNavigation()?.extras.state?.['user'];
  resultadoQR = '';


  constructor(private activerouter: ActivatedRoute, 
              private router: Router, 
              private alertController: AlertController, 
              private modalController: ModalController,
              private platform: Platform,
              private controladorDeCarga: LoadingController) {
    this.activerouter.queryParams.subscribe(params => {

    });
  }

  ngOnInit() {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
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





async scannerQR() {
  const modal = await this.modalController.create({
  component: BarcodeScanningModalComponent,
  cssClass: 'barcode-scanning-modal',
  showBackdrop: false,
  componentProps: { 
    datos: [],
    LensFacing: LensFacing.Back
  }
  });

  await modal.present();


  const { data } = await modal.onWillDismiss();

  if(data){
    this.resultadoQR = data?.barcode?.displeyValue;
  }

}














}