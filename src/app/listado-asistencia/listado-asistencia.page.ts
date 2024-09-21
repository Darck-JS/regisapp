import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-asistencia',
  templateUrl: './listado-asistencia.page.html',
  styleUrls: ['./listado-asistencia.page.scss'],
})
export class ListadoAsistenciaPage implements OnInit {

  constructor(private rouer: Router) { }

  ngOnInit() {
  }

navega(){
  this.rouer.navigate(['/home'])
}



}
