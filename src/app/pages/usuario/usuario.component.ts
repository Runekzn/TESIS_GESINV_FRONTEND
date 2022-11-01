import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { Usuario } from 'src/app/_model/usuario';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  lista: Usuario[];
  id2: Number;
  constructor(
    private usuarioservicio: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.usuarioservicio.listar().subscribe((data) => {
      this.lista = data;
      console.log(this.lista)
    });

    this.usuarioservicio.getUsuarioCambio().subscribe((data) => {
      this.lista = data;
    });

    this.usuarioservicio.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }
  eliminar(id: string) {
    this.id2 = parseInt(id);
    this.usuarioservicio
      .eliminar(this.id2)
      .pipe(
        switchMap(() => {
          return this.usuarioservicio.listar();
        })
      )
      .subscribe((data) => {
        this.lista = data;
        this.usuarioservicio.setMenajeCambio(
          'Se elimino exitosamente el usuario'
        );
      });
  }
  filtrar(e : any){
   this.lista.filter = e.target.value.trim().toLowerCase();
  }

}
