import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/_service/producto.service';
import { Producto } from 'src/app/_model/producto';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  lista:Producto[];
  id2: Number;
  constructor(
    private productoService: ProductoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productoService.listar().subscribe(data =>{
      this.lista = data;
    });

    this.productoService.getProductoCambio().subscribe((data) => {
      this.lista = data;
    });

    this.productoService.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });

  }

  eliminar(id: string) {
    this.id2 = parseInt(id);
    this.productoService
      .eliminar(this.id2)
      .pipe(
        switchMap(() => {
          return this.productoService.listar();
        })
      )
      .subscribe((data) => {
        this.lista = data;
        this.productoService.setMenajeCambio(
          'Se elimino exitosamente el registro'
        );
      });
  }

  filtrar(e : any){
    this.lista.filter = e.target.value.trim().toLowerCase();
   }

}
