import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage implements OnInit {
  Usuario = this.router.getCurrentNavigation()?.extras.state?.['user'];
  now = new Date();
  fecha = this.now.toLocaleString();
  constructor(private activerouter: ActivatedRoute, private router: Router) {
    this.activerouter.queryParams.subscribe(params => {

    });
  }

  ngOnInit() {
  }

  // const takePicture = async () => {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     resultType: CameraResultType.Uri
  //   });
  //   const imageUrl = image.webPath;
  //   imageElement.src = imageUrl;
  // };







  navega(nombre: string, usu: string) {
    let setData: NavigationExtras = {

      state: {

        curso: nombre,
        user: usu
      }
    };

    this.router.navigate(['/foto-registro'], setData);
  }
  volver() {
    this.router.navigate(['/login'])
  }


  cursos = [
    { id: 1, nombre: 'PROGRAMACION WEB', codigo: 'pwb567', seccion: '017v', hora: '15:00 hrs' },
    { id: 2, nombre: 'PROGRAMACION MOBIL', codigo: 'pwb567', seccion: '017v', hora: '16:00 hrs' },
    { id: 3, nombre: 'PROGRAMACION DE BASE DE DATOS', codigo: 'pwb567', seccion: '017v', hora: '17:00 hrs' },
    { id: 4, nombre: 'INGLES ELEMENTAL', codigo: 'pwb567', seccion: '017v', hora: '18:00 hrs' },
  ]




}
