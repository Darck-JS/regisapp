import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ConsumoapiService } from '../service/consumoapi.service';
import * as QRCode from 'qrcode-generator';
import { ServicioCompartidoService } from '../service/servicio-compartido.service';

@Component({
  selector: 'app-listado-asistencia',
  templateUrl: './listado-asistencia.page.html',
  styleUrls: ['./listado-asistencia.page.scss'],
})
export class ListadoAsistenciaPage implements OnInit {
  qrDataURL = '';
  Usuario = this.router.getCurrentNavigation()?.extras.state?.['user'];
  idUsu = this.router.getCurrentNavigation()?.extras.state?.['iduser']
  idClase = this.router.getCurrentNavigation()?.extras.state?.['idCur'];
  nombreClase = this.router.getCurrentNavigation()?.extras.state?.['nombre'];
  codigoClase = this.router.getCurrentNavigation()?.extras.state?.['codigo'];
  seccionClase = this.router.getCurrentNavigation()?.extras.state?.['seccion'];
  nombreCurso: any;


  constructor(private activerouter: ActivatedRoute,
    private router: Router,
    private consumoapi: ConsumoapiService,
    private servicioCompartido: ServicioCompartidoService) {
    this.activerouter.queryParams.subscribe(params => {
    });

  }

  ngOnInit() {
    this.generaQR(); // Genera el QR al cargar la página

    // Escucha notificaciones del servicio compartido para refrescar la lista
    this.servicioCompartido.refrescarLista$.subscribe((debeActualizar) => {
      if (debeActualizar) {
        this.obtenerAlumnos(); // Forzar carga de la lista desde la API
      }
    });

    // Carga inicial de los alumnos
    this.obtenerAlumnos();
  }


  generaQR() {
    if (this.idClase) {
      const fechaActual = new Date().toISOString().split('T')[0]; //formato fecha
      const data = `${this.nombreClase}, ${this.codigoClase}, ${this.seccionClase}, ${fechaActual}, ${this.idUsu}`;
      this.qrDataURL = data;
    }
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


  alumnos: any[] = [];

  // obtener cursos
  obtenerAlumnos() {
    // Llama al servicio de la API para obtener los alumnos del curso actual
    this.consumoapi.getalumnXprofe(this.idUsu, this.idClase).subscribe((res) => {
      // Mapea la respuesta para transformar el estado numérico en texto legible
      this.alumnos = res.map((alumno: { id: any; rut: any; nombre: any; status: string; }) => ({
        id: alumno.id,                 // ID del alumno
        rut: alumno.rut,               // RUT del alumno
        nombre: alumno.nombre,         // Nombre del alumno
        status: parseInt(alumno.status) === 1 ? 'PRESENTE' : 'AUSENTE' // Estado transformado
      }));

      // Log para depuración
      console.log("Lista de alumnos actualizada:", this.alumnos);
    });
  }

  volver() {
    this.router.navigate(['/home-profesor']);
  }





}