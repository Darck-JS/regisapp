import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioCompartidoService {

  private refrescarListaSubject = new BehaviorSubject<boolean>(false);
  refrescarLista$ = this.refrescarListaSubject.asObservable();


  constructor() { }


  notificarActualizacion() {
    this.refrescarListaSubject.next(true);
  }
  
}
