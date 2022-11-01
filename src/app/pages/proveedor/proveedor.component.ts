import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/_service/proveedor.service';
import { Proveedor } from 'src/app/_model/proveedor';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  lista:Proveedor[];
  id2: Number;
  constructor(
    private proveedorService: ProveedorService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.proveedorService.listar().subscribe(data =>{
      this.lista = data;
    });

    this.proveedorService.getProveedorCambio().subscribe((data) => {
      this.lista = data;
    });

    this.proveedorService.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }

  eliminar(id: string) {
    this.id2 = parseInt(id);
    this.proveedorService
      .eliminar(this.id2)
      .pipe(
        switchMap(() => {
          return this.proveedorService.listar();
        })
      )
      .subscribe((data) => {
        this.lista = data;
        this.proveedorService.setMenajeCambio(
          'Se elimino exitosamente el registro'
        );
      });
  }
  filtrar(e : any){
   this.lista.filter = e.target.value.trim().toLowerCase();
  }
}
