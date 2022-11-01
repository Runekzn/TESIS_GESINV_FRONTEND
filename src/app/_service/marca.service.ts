import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Marca } from '../_model/marca';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private marcaCambio: Subject<Marca[]> = new Subject<Marca[]>();
  private mensajeCambio:Subject<string> = new Subject<string>()
  private url: string = `${environment.HOST}/api/marca`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Marca[]>(this.url);
  }

  listarPorId(id:number){
    return this.http.get<Marca>(`${this.url}/${id}`);
  }

  registrar(marca:Marca){
    return this.http.post(this.url , marca);
  }

  modificar(marca:Marca){
    return this.http.put(this.url , marca);
  }

  eliminar(id:Number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getMarcaCambio(){
    return this.marcaCambio.asObservable()
  }

  setMarcaCambio(lista: Marca[]){
    this.marcaCambio.next(lista)
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable()
  }

  setMenajeCambio(msj: string){
    this.mensajeCambio.next(msj)
  }


}
