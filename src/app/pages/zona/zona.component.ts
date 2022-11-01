import { Component, OnInit } from '@angular/core';
import { ZonaService } from 'src/app/_service/zona.service';
import { Zona } from 'src/app/_model/zona';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.css']
})
export class ZonaComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  id2: Number;
  lista: Zona[];
  categoriaservice: any;
  
  constructor(
    private zonaservice: ZonaService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.zonaservice.listar().subscribe(data =>{
      this.lista = data;
    });


    this.zonaservice.getZonaCambio().subscribe((data) => {
      this.lista = data;
    });

    this.zonaservice.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });

  }

  eliminar(id: string) {
    this.id2 = parseInt(id);
    this.zonaservice
      .eliminar(this.id2)
      .pipe(
        switchMap(() => {
          return this.zonaservice.listar();
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
