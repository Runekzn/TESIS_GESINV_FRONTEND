import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/_service/marca.service';
import { Marca } from 'src/app/_model/marca';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css'],
})
export class MarcaComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  lista: Marca[];
  id2: Number;
  constructor(
    private marcaService: MarcaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.marcaService.listar().subscribe((data) => {
      this.lista = data;
    });

    this.marcaService.getMarcaCambio().subscribe((data) => {
      this.lista = data;
    });

    this.marcaService.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });

  }


  eliminar(id: string){
    this.id2 = parseInt(id);
    this.marcaService
      .eliminar(this.id2)
      .pipe(
        switchMap(() => {
          return this.marcaService.listar();
        })
      )
      .subscribe((data) =>{
        this.lista = data;
        this.marcaService.setMenajeCambio(
          'Se elimino exitosamente el registro'
        )
      })
  }

  filtrar(e : any){
    this.lista.filter = e.target.value.trim().toLowerCase();
   }
}
