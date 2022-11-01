import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Zona } from '../_model/zona';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  private zonaCambio: Subject<Zona[]> = new Subject<Zona[]>();
  private mensajeCambio:Subject<string> = new Subject<string>()
  private url: string = `${environment.HOST}/api/zona`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Zona[]>(this.url);
  }

  listarPorId(id:number){
    return this.http.get<Zona>(`${this.url}/${id}`);
  }

  registrar(zona:Zona){
    return this.http.post(this.url , zona);
  }

  modificar(zona:Zona){
    return this.http.put(this.url , Zona);
  }

  eliminar(id:Number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getZonaCambio(){
    return this.zonaCambio.asObservable()
  }

  setZonaCambio(lista: Zona[]){
    this.zonaCambio.next(lista)
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable()
  }

  setMenajeCambio(msj: string){
    this.mensajeCambio.next(msj)
  }
}
