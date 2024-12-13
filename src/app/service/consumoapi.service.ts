import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpHandler } from '@angular/common/http'; 
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs'; 
import { __param } from 'tslib';



@Injectable({
  providedIn: 'root'
})
export class ConsumoapiService {

  httpOptions = { 
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*' 
    })
  }


  apiURL = 'https://sistencias-cedrh5hdgpasc3gy.brazilsouth-01.azurewebsites.net/';
  // apiURL = 'https://dqdkhkqg-5000.brs.devtunnels.ms/';


  constructor(private http: HttpClient) { }


  GetProfesor(): Observable<any> {
    return this.http.get(this.apiURL + 'profesores').pipe(
      retry(3)
    );
  }
  

  GetCursoXprofe(id: number): Observable<any>{
    return this.http.get(this.apiURL+'profesores/'+id+'/cursos', this.httpOptions).pipe(retry(4));
  }
  
  getalumnXprofe(idProf: number, idCur: number): Observable<any>{
    return this.http.get(this.apiURL+ 'profesores/'+ idProf+ '/cursos/'+idCur+'/alumnos').pipe(retry(2));
  }

  postLogin(usuario: any, password: any): Observable<any>{
    const credenciales = { user: usuario, password: password };
  return this.http.post(this.apiURL+'login',credenciales,this.httpOptions).pipe();
  }
  
  postPresente(alumno_id: any, codigo: any, seccion: any, fecha: any): Observable<any>{
    const datos = { alumno_id: alumno_id, codigo: codigo, seccion: seccion, fecha: fecha};
    return this.http.post(this.apiURL+'registrar_asistencia', datos, this.httpOptions).pipe(retry(3));
  }

  


}
