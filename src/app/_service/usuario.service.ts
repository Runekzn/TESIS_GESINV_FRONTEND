import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../_model/usuario';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioCambio: Subject<Usuario[]> = new Subject<Usuario[]>();
  private mensajeCambio:Subject<string> = new Subject<string>()
  private url: string = `${environment.HOST}/api/usuario`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Usuario[]>(this.url);
  }

  listarPorId(id:number){
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  registrar(usuario:Usuario){
    return this.http.post(this.url , usuario);
  }

  modificar(usuario:Usuario){
    return this.http.put(this.url , usuario);
  }

  eliminar(id:Number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getUsuarioCambio(){
    return this.usuarioCambio.asObservable()
  }

  setUsuarioCambio(lista: Usuario[]){
    this.usuarioCambio.next(lista)
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable()
  }

  setMenajeCambio(msj: string){
    this.mensajeCambio.next(msj)
  }


}
