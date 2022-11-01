import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { Categoria } from 'src/app/_model/categoria';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';



@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  lista: Categoria[];
  id2: Number;
  constructor(
    private categoriaservice: CategoriaService,
    private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.categoriaservice.listar().subscribe((data) => {
      this.lista = data;
    });

    this.categoriaservice.getCategoriaCambio().subscribe((data) => {
      this.lista = data;
    });

    this.categoriaservice.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }

  eliminar(id: string) {
    this.id2 = parseInt(id);
    this.categoriaservice
      .eliminar(this.id2)
      .pipe(
        switchMap(() => {
          return this.categoriaservice.listar();
        })
      )
      .subscribe((data) => {
        this.lista = data;
        this.categoriaservice.setMenajeCambio(
          'Se elimino exitosamente el registro'
        );
      });
  }
  filtrar(e : any){
   this.lista.filter = e.target.value.trim().toLowerCase();
  }
}
