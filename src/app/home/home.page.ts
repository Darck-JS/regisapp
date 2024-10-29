import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ConsumoapiService } from '../service/consumoapi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage implements OnInit{
  
  titulo = "";
  Usuario = "";
  // Usuario = this.router.getCurrentNavigation()?.extras.state?.['user'];
  now = new Date();
  fecha = this.now.toLocaleString();
  

  constructor(private activerouter: ActivatedRoute, private router: Router, private consumoApi: ConsumoapiService) {
    this.activerouter.queryParams.subscribe(params => {
      this.router.getCurrentNavigation()?.extras.state?.['user'];
      this.router.getCurrentNavigation()?.extras.state?.['id'];

    });
  }
  ngOnInit(): void {
    this.ObtenerDatos();
    this.obtenerCursos();
  }

  // cursos = [
  //   {id:1, nombre: 'PROGRAMACION WEB', codigo: 'pwb567', seccion: '017v', hora: '15:00 hrs'},
  //   {id:2, nombre: 'PROGRAMACION MOBIL', codigo: 'pwb568', seccion: '017v', hora: '16:00 hrs'},
  //   {id:3, nombre: 'PROGRAMACION DE BASE DE DATOS', codigo: 'pwb569', seccion: '017v', hora: '17:00 hrs'},
  //   {id:4, nombre: 'INGLES ELEMENTAL', codigo: 'pwb569', seccion: '017v', hora: '18:00 hrs'},
  // ]
  cursos: any[] =[];

  volver() {
    this.router.navigate(['/login']);
  }
  navega(id: number, nombre: string, codigo: string, seccion: string) {
    let setData: NavigationExtras = {
      
      state: {
        
        curso: id, nombre, codigo, seccion,
        user: this.Usuario
      }
    };

    this.router.navigate(['/listado-asistencia'], setData);
  }


  // metodo para mostrar
  ObtenerDatos(){
    this.consumoApi.PostProfesor().subscribe((res)=>{
      // console.log(res[0]);
      this.Usuario = res[0].nombre;
      
    });
  }

  // obtener cursos
  obtenerCursos(){
    this.consumoApi.GetCursoXprofe(1).subscribe((res)=>{
      this.cursos = res;
    })
  }



}


