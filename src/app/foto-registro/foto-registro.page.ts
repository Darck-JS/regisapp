import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ConsumoapiService } from '../service/consumoapi.service';
import { ServicioCompartidoService } from '../service/servicio-compartido.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  txtQR: any[] = [];
  respPost  = '';


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

  if (data) {
    this.resultadoQR = data?.barcode?.displayValue;

    // Verifica que el QR contiene los datos en el formato correcto
    this.txtQR = this.resultadoQR.split(',').map(d => d.trim());

    // Verifica que el array tiene los 4 elementos esperados
    if (this.txtQR.length === 4) {
      const [codigoClase, seccionClase, fecha] = this.txtQR;

      // Registrar la asistencia
      let codigo: string = this.txtQR[1];
      let seccion: string = this.txtQR[2];
      let fechaqr: string = this.txtQR[3];
      this.consumoApi.postPresente(parseInt(this.idUser), codigo.toLocaleUpperCase(), seccion.toLocaleUpperCase(), fechaqr).subscribe(
        (res) => {
          // Respuesta exitosa
          this.respPost = res;
          console.log("Respuesta de la API:", this.respPost);
          this.servicioCompartido.notificarActualizacion();
        },
        (error) => {
          // Mejor manejo del error
          console.error("Error al registrar la asistencia:", error);
      
          if (error instanceof HttpErrorResponse) {
            console.error("Error HTTP:", error.message);
            // Si la respuesta tiene un cuerpo de error, lo mostramos
            console.error("Detalles del error:", error.error);
          } else {
            console.error("Error desconocido:", error);
          }
        }
      );         
  }
}
}



}