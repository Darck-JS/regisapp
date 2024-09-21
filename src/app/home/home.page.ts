import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {
  

  Usuario = this.router.getCurrentNavigation()?.extras.state?.['user'];
  fecha = this.diaActual();
  

  constructor(private activerouter: ActivatedRoute, private router: Router) {
    this.activerouter.queryParams.subscribe(params => {
      this.router.getCurrentNavigation()?.extras.state?.['user'];
      this.router.getCurrentNavigation()?.extras.state?.['id'];

    });
  }

  diaActual() {
    const fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
    return desdeStr;
  }
  volver() {
    this.router.navigate(['/login']);
  }
  navega() {
    this.router.navigate(['/listado-asistencia']);
  }
  selecclass(){
    
  }








  
}


