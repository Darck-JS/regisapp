import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ConsumoapiService } from '../service/consumoapi.service';
import { ServicioCompartidoService } from '../service/servicio-compartido.service';

@Component({
  selector: 'app-foto-registro',
  templateUrl: './foto-registro.page.html',
  styleUrls: ['./foto-registro.page.scss'],
})
export class FotoRegistroPage implements OnInit {

  curso = this.router.getCurrentNavigation()?.extras.state?.['curso'] || '';
  usuario = this.router.getCurrentNavigation()?.extras.state?.['nombre'] || '';
  idUser = this.router.getCurrentNavigation()?.extras.state?.['id'] || '';
  resultadoQR = '';


  constructor(private activerouter: ActivatedRoute, 
              private router: Router, 
              private alertController: AlertController, 
              private modalController: ModalController,
              private platform: Platform,
              private controladorDeCarga: LoadingController,
              private consumoApi: ConsumoapiService,
              private servicioCompartido: ServicioCompartidoService) {
    this.activerouter.queryParams.subscribe(params => {
      
    });
  }

  ngOnInit() {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported()
        .then((isSupported) => console.log('BarcodeScanner is supported:', isSupported))
        .catch((error) => console.error('Error checking BarcodeScanner support:', error));
  
      BarcodeScanner.checkPermissions()
        .then((permissions) => console.log('Permissions:', permissions))
        .catch((error) => console.error('Error checking permissions:', error));
  
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


volver(){
  this.router.navigate(['/login'])
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
    this.resultadoQR = data?.barcode?.displayValue;

    // Extraer datos del QR
    const [nombreClase, codigoClase, seccionClase, fecha, idusu] = this.resultadoQR.split(',').map(d => d.trim());

    // Registrar la asistencia
    this.consumoApi.postPresente(this.idUser, codigoClase, seccionClase, fecha).subscribe(() => {
      // Obtener lista actualizada
      this.servicioCompartido.notificarActualizacion();
      // this.consumoApi.getalumnXprofe(parseInt(idusu), parseInt(codigoClase)).subscribe((resul) => {
      //   this.servicioCompartido.actualizarAlumnos(resul); // Compartir la lista actualizada
      // });
    });
  }

}

// 









}