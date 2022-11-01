import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Categoria } from '../_model/categoria';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriaCambio: Subject<Categoria[]> = new Subject<Categoria[]>();
  private mensajeCambio:Subject<string> = new Subject<string>()
  private url: string = `${environment.HOST}/api/categoria`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Categoria[]>(this.url);
  }

  listarPorId(id:number){
    return this.http.get<Categoria>(`${this.url}/${id}`);
  }

  registrar(categoria:Categoria){
    return this.http.post(this.url , categoria);
  }

  modificar(categoria:Categoria){
    return this.http.put(this.url , categoria);
  }

  eliminar(id:Number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getCategoriaCambio(){
    return this.categoriaCambio.asObservable()
  }

  setCategoriaCambio(lista: Categoria[]){
    this.categoriaCambio.next(lista)
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable()
  }

  setMenajeCambio(msj: string){
    this.mensajeCambio.next(msj)
  }

}
