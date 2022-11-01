import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rol } from '../_model/rol';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private rolCambio: Subject<Rol[]> = new Subject<Rol[]>();
  private mensajeCambio:Subject<string> = new Subject<string>()
  private url: string = `${environment.HOST}/api/rol`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Rol[]>(this.url);
  }

  listarPorId(id:number){
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

  registrar(rol:Rol){
    return this.http.post(this.url , rol);
  }

  modificar(rol:Rol){
    return this.http.put(this.url , rol);
  }

  eliminar(id:Number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getCategoriaCambio(){
    return this.rolCambio.asObservable()
  }

  setRolCambio(lista: Rol[]){
    this.rolCambio.next(lista)
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable()
  }

  setMensajeCambio(msj: string){
    this.mensajeCambio.next(msj)
  }


}
