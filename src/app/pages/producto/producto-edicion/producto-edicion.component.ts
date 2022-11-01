import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Producto } from 'src/app/_model/producto';
import { ProductoService } from 'src/app/_service/producto.service';
import { ProveedorComponent } from '../../proveedor/proveedor.component';
import { CategoriaComponent } from '../../categoria/categoria.component';
import { MarcaComponent } from '../../marca/marca.component';
import { ZonaComponent } from '../../zona/zona.component';

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css']
})
export class ProductoEdicionComponent implements OnInit {

  @ViewChild(ProveedorComponent) proveedor;
  @ViewChild(CategoriaComponent) categoria;
  @ViewChild(MarcaComponent) marca;
  @ViewChild(ZonaComponent) zona;

  id:number = 0;
  edicion:boolean = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id':new FormControl(0),
      'nombre': new FormControl(''),
      'codigo': new FormControl(''),
      'descripcion': new FormControl(''),
      'precio': new FormControl(''),
      'stock': new FormControl(''),
      'imagen': new FormControl(''),
      'iva': new FormControl(''),
      'iproveedor': new FormControl(this.proveedor.idProveedor),
      'icategoria':new FormControl(this.categoria.idCategoria),
      'imarca': new FormControl(this.marca.idMarca),
      'izona': new FormControl(this.zona.idZona)
    });

    this.route.params.subscribe(data => {
      this.id = data['id']
      this.edicion = data['id'] != null;
      this.initForm();
    })
  }

  initForm(){
    if(this.edicion){
      this.productoService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id':new FormControl(data.idProducto),
          'nombre': new FormControl(data.nombre),
          'codigo': new FormControl(data.codigo),
          'descripcion': new FormControl(data.descripcion),
          'precio': new FormControl(data.precio),
          'stock': new FormControl(data.stock),
          'imagen': new FormControl(data.imagen),
          'iva': new FormControl(data.iva),
          'iproveedor': new FormControl(data.idProveedor),
          'icategoria': new FormControl(data.idCategoria),
          'imarca': new FormControl(data.idMarca),
          'izona': new FormControl(data.idZona)
        });
      });
    }
  }

  operar(){
    let producto = new Producto()
    producto.idProducto = this.form.get('id').value;
    producto.nombre = this.form.get('nombre').value;
    producto.codigo = this.form.get('codigo').value;
    producto.descripcion = this.form.get('descripcion').value;

    producto.precio = this.form.get('precio').value;
    producto.stock = this.form.get('stock').value;
    producto.imagen = this.form.get('imagen').value;
    producto.iva = this.form.get('iva').value;

    producto.idProveedor = this.form.get('iproveedor').value;
    producto.idCategoria = this.form.get('icategoria').value;
    producto.idMarca = this.form.get('imarca').value;
    producto.idZona = this.form.get('izona').value;

    if(this.edicion){
      //Modificar.
      this.productoService.modificar(producto).subscribe(()=>{
        this.productoService.listar().subscribe(data =>{
          this.productoService.setProductoCambio(data);
          this.productoService.setMenajeCambio('Se modifico el producto')
        });
      });
    }else{
      //registrar
      this.productoService.registrar(producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.setProductoCambio(data)
        this.productoService.setMenajeCambio('Se registro el producto')
      })
    }

    this.router.navigate(['/producto'])

  }

}
