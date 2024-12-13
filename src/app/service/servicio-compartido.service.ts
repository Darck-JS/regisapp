import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioCompartidoService {

  private refrescarListaSubject = new BehaviorSubject<boolean>(false);
  refrescarLista$ = this.refrescarListaSubject.asObservable();

  // private alumnosSubject = new BehaviorSubject<any[]>([]);
  // alumnos$ = this.alumnosSubject.asObservable();

  constructor() { }

  // actualizarAlumnos(nuevaLista: any[]) {
  //   this.alumnosSubject.next(nuevaLista);
  // }

  notificarActualizacion() {
    this.refrescarListaSubject.next(true); // Indica que hay que actualizar la lista
  }
  
}
