import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-listado-asistencia',
  templateUrl: './listado-asistencia.page.html',
  styleUrls: ['./listado-asistencia.page.scss'],
})
export class ListadoAsistenciaPage implements OnInit {
  nombreClase = this.router.getCurrentNavigation()?.extras.state?.['curso'];
  Usuario = this.router.getCurrentNavigation()?.extras.state?.['user'];


  constructor(private activerouter: ActivatedRoute, private router: Router) {
    this.activerouter.queryParams.subscribe(params => {
      this.router.getCurrentNavigation()?.extras.state?.['user'];
    });

  }


  ngOnInit() {
  }

  navega() {
    this.router.navigate(['/home'])
  }

  alumnos = [
    { rut: '1-9', nombre: 'Juan Fernández', estado: 'PRESENTE' },
    { rut: '2-9', nombre: 'Laura González', estado: 'AUSENTE' },
    { rut: '3-9', nombre: 'Andrea López', estado: 'AUSENTE' },
    { rut: '4-9', nombre: 'Carlos Martínez', estado: 'AUSENTE' },
    { rut: '5-9', nombre: 'Pedro Pérez', estado: 'AUSENTE' },
    { rut: '6-9', nombre: 'Sofía Rodríguez', estado: 'AUSENTE' },
    { rut: '7-9', nombre: 'Daniela Sánchez', estado: 'PRESENTE' },
    { rut: '8-9', nombre: 'Valentina Silva', estado: 'PRESENTE' },
    { rut: '9-9', nombre: 'Alejandro Silva', estado: 'PRESENTE' },
    { rut: '10-9', nombre: 'Jorge Solis', estado: 'PRESENTE' },
  ]
  
}