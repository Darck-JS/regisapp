import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {
  

  Usuario = this.router.getCurrentNavigation()?.extras.state?.['user'];
  now = new Date();
  fecha = this.now.toLocaleString();
  

  constructor(private activerouter: ActivatedRoute, private router: Router) {
    this.activerouter.queryParams.subscribe(params => {
      this.router.getCurrentNavigation()?.extras.state?.['user'];
      this.router.getCurrentNavigation()?.extras.state?.['id'];

    });
  }
  ngOnInit() {
  }

  cursos = [
    {id:1, nombre: 'PROGRAMACION WEB', codigo: 'pwb567', seccion: '017v', hora: '15:00 hrs'},
    {id:2, nombre: 'PROGRAMACION MOBIL', codigo: 'pwb567', seccion: '017v', hora: '16:00 hrs'},
    {id:3, nombre: 'PROGRAMACION DE BASE DE DATOS', codigo: 'pwb567', seccion: '017v', hora: '17:00 hrs'},
    {id:4, nombre: 'INGLES ELEMENTAL', codigo: 'pwb567', seccion: '017v', hora: '18:00 hrs'},
  ]



  volver() {
    this.router.navigate(['/login']);
  }
  navega(nombre: string) {
    let setData: NavigationExtras = {
      
      state: {
        
        curso: nombre,
        user: this.Usuario
      }
    };

    this.router.navigate(['/listado-asistencia'], setData);
  }

}


