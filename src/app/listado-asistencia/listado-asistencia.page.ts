import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ConsumoapiService } from '../service/consumoapi.service';
import * as QRCode from 'qrcode-generator';

@Component({
  selector: 'app-listado-asistencia',
  templateUrl: './listado-asistencia.page.html',
  styleUrls: ['./listado-asistencia.page.scss'],
})
export class ListadoAsistenciaPage implements OnInit {
  qrDataURL = '';
  respuesta = "";
  Usuario = this.router.getCurrentNavigation()?.extras.state?.['user'];
  idClase = this.router.getCurrentNavigation()?.extras.state?.['id'];
  nombreClase = this.router.getCurrentNavigation()?.extras.state?.['nombre'];
  codigoClase = this.router.getCurrentNavigation()?.extras.state?.['codigo'];
  seccionClase = this.router.getCurrentNavigation()?.extras.state?.['seccion'];


  constructor(private activerouter: ActivatedRoute, private router: Router,private consumoapi: ConsumoapiService) {
    this.activerouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.idClase = this.router.getCurrentNavigation()?.extras.state?.['id'];
        
      }
    });

  }
  
  generaQR(){
    if (this.idClase) {
      const fechaActual = new Date().toISOString().split('T')[0]; //formato fecha
      const data = `${this.codigoClase}-${this.seccionClase}-${fechaActual}`;

      let qr = QRCode(4, 'L');
      qr.addData(data);
      qr.make();
      this.qrDataURL = qr.createDataURL(4);
    }
  }

  ngOnInit() {
    this.generaQR();
  }

  navega() {
    this.router.navigate(['/home'])
  }





  // alumnos = [
  //   { rut: '1-9', nombre: 'Juan Fernández', estado: 'PRESENTE' },
  //   { rut: '2-9', nombre: 'Laura González', estado: 'AUSENTE' },
  //   { rut: '3-9', nombre: 'Andrea López', estado: 'AUSENTE' },
  //   { rut: '4-9', nombre: 'Carlos Martínez', estado: 'AUSENTE' },
  //   { rut: '5-9', nombre: 'Pedro Pérez', estado: 'AUSENTE' },
  //   { rut: '6-9', nombre: 'Sofía Rodríguez', estado: 'AUSENTE' },
  //   { rut: '7-9', nombre: 'Daniela Sánchez', estado: 'PRESENTE' },
  //   { rut: '8-9', nombre: 'Valentina Silva', estado: 'PRESENTE' },
  //   { rut: '9-9', nombre: 'Alejandro Silva', estado: 'PRESENTE' },
  //   { rut: '10-9', nombre: 'Jorge Solis', estado: 'PRESENTE' },
  // ]


  alumnos: any[] =[];


  
}