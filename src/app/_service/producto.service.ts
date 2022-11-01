import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../_model/producto';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private productoCambio: Subject<Producto[]> = new Subject<Producto[]>();
  private mensajeCambio:Subject<string> = new Subject<string>()
  private url: string = `${environment.HOST}/api/producto`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Producto[]>(this.url);
  }

  listarPorId(id:number){
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  registrar(producto:Producto){
    return this.http.post(this.url , producto);
  }

  modificar(producto:Producto){
    return this.http.put(this.url , producto);
  }

  eliminar(id:Number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getProductoCambio(){
    return this.productoCambio.asObservable()
  }

  setProductoCambio(lista: Producto[]){
    this.productoCambio.next(lista)
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable()
  }

  setMenajeCambio(msj: string){
    this.mensajeCambio.next(msj)
  }
}
