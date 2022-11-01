import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Proveedor } from 'src/app/_model/proveedor';
import { ProveedorService } from 'src/app/_service/proveedor.service';

@Component({
  selector: 'app-proveedor-edicion',
  templateUrl: './proveedor-edicion.component.html',
  styleUrls: ['./proveedor-edicion.component.css']
})
export class ProveedorEdicionComponent implements OnInit {



  @Input() id:number = 0;
  edicion:boolean = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private proveedorService: ProveedorService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      'id':new FormControl(0),
      'descripcion': new FormControl(''),
      'nombre': new FormControl(''),
      'direccion': new FormControl(''),
      'telefono': new FormControl(''),
      'email': new FormControl('')
    });

    this.route.params.subscribe(data => {
      this.id = data['id']
      this.edicion = data['id'] != null;
      this.initForm();
    })
  }

  initForm(){
    if(this.edicion){
      this.proveedorService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id':new FormControl(data.idProveedor),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion),
          'direccion': new FormControl(data.direccion),
          'telefono':new FormControl(data.telefono),
          'email':new FormControl(data.email)
        });
      });
    }
  }

  operar(){
    let categoria = new Proveedor()
    categoria.idProveedor = this.form.get('id').value;
    categoria.descripcion = this.form.get('descripcion').value;
    categoria.nombre = this.form.get('nombre').value;
    categoria.telefono = this.form.get('telefono').value;
    categoria.direccion = this.form.get('direccion').value;
    categoria.email = this.form.get('email').value;

    if(this.edicion){
      //Modificar.
      this.proveedorService.modificar(categoria).subscribe(()=>{
        this.proveedorService.listar().subscribe(data =>{
          this.proveedorService.setProveedorCambio(data);
          this.proveedorService.setMenajeCambio('Se modifico la categoria')
        });
      });
    }else{
      //registrar
      this.proveedorService.registrar(categoria).pipe(switchMap(() => {
        return this.proveedorService.listar();
      })).subscribe(data => {
        this.proveedorService.setProveedorCambio(data)
        this.proveedorService.setMenajeCambio('Se registro la categoria')
      })
    }

    this.router.navigate(['/proveedor'])
  }

}
