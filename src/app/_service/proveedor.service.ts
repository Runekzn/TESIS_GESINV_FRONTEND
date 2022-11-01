import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../_model/proveedor';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private categoriaCambio: Subject<Proveedor[]> = new Subject<Proveedor[]>();
  private mensajeCambio:Subject<string> = new Subject<string>()
  private url: string = `${environment.HOST}/api/proveedor`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Proveedor[]>(this.url);
  }

  listarPorId(id:number){
    return this.http.get<Proveedor>(`${this.url}/${id}`);
  }

  registrar(proveedor:Proveedor){
    return this.http.post(this.url , proveedor);
  }

  modificar(proveedor:Proveedor){
    return this.http.put(this.url , proveedor);
  }

  eliminar(id:Number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getProveedorCambio(){
    return this.categoriaCambio.asObservable()
  }

  setProveedorCambio(lista: Proveedor[]){
    this.categoriaCambio.next(lista)
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable()
  }

  setMenajeCambio(msj: string){
    this.mensajeCambio.next(msj)
  }

}
