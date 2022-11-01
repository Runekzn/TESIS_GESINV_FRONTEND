import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-usuario-edicion',
  templateUrl: './usuario-edicion.component.html',
  styleUrls: ['./usuario-edicion.component.css']
})
export class UsuarioEdicionComponent implements OnInit {

  id:number = 0;
  edicion:boolean = false;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router ) {
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      'id':new FormControl(0),
      'nombre': new FormControl(''),
      'password': new FormControl(''),
      'estado': new FormControl(''),
    });

    this.route.params.subscribe(data => {
      this.id = data['id']
      this.edicion = data['id'] != null;
      this.initForm();
    })
  }

  initForm(){
    if(this.edicion){
      this.usuarioService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id':new FormControl(data.idUsuario),
          'nombre': new FormControl(data.nombre),
          'password': new FormControl(data.contrasena),
          'estado': new FormControl(data.estado)
        });
      });
    }
  }

  operar(){
    let usuario = new Usuario()
    usuario.idUsuario = this.form.get('id').value;
    usuario.nombre = this.form.get('nombre').value;
    usuario.contrasena = this.form.get('password').value;
    usuario.estado = this.form.get('estado').value;

    if(this.edicion){
      //Modificar.
      this.usuarioService.modificar(usuario).subscribe(()=>{
        this.usuarioService.listar().subscribe(data =>{
          this.usuarioService.setUsuarioCambio(data);
          this.usuarioService.setMenajeCambio('Se modifico el usuario')
        });
      });
    }else{
      //registrar
      this.usuarioService.registrar(usuario).pipe(switchMap(() => {
        return this.usuarioService.listar();
      })).subscribe(data => {
        this.usuarioService.setUsuarioCambio(data)
        this.usuarioService.setMenajeCambio('Se registro la categoria')
      })
    }

    this.router.navigate(['/usuario'])

  }

}
