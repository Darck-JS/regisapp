import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioCompartidoService {

  private alumnosSubject = new BehaviorSubject<any[]>([]);
  alumnos$ = this.alumnosSubject.asObservable();

  constructor() { }

  actualizarAlumnos(nuevaLista: any[]) {
    this.alumnosSubject.next(nuevaLista);
  }
  
}
