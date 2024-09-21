import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage implements OnInit {
  Usuario = this.router.getCurrentNavigation()?.extras.state?.['user'];
  fecha = this.diaActual();
  constructor(private router: Router) { }

  ngOnInit() {
  }

navega(){
  this.router.navigate(['/foto-registro'])
}

volver(){
  this.router.navigate(['/login'])
}


  diaActual() {
    const fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
    return desdeStr;
  }

}
