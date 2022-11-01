import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Categoria } from 'src/app/_model/categoria';
import { CategoriaService } from 'src/app/_service/categoria.service';


@Component({
  selector: 'app-categoria-edicion',
  templateUrl: './categoria-edicion.component.html',
  styleUrls: ['./categoria-edicion.component.css']
})
export class CategoriaEdicionComponent implements OnInit {

  id:number = 0;
  edicion:boolean = false;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private router: Router ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id':new FormControl(0),
      'descripcion': new FormControl('')
    });

    this.route.params.subscribe(data => {
      this.id = data['id']
      this.edicion = data['id'] != null;
      this.initForm();
    })
  }

  initForm(){
    if(this.edicion){
      this.categoriaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id':new FormControl(data.idCategoria),
          'descripcion': new FormControl(data.descripcion)
        });
      });
    }
  }

  operar(){

    let categoria = new Categoria()
    categoria.idCategoria = this.form.get('id').value;
    categoria.descripcion = this.form.get('descripcion').value;

    if(this.edicion){
      //Modificar.
      this.categoriaService.modificar(categoria).subscribe(()=>{
        this.categoriaService.listar().subscribe(data =>{
          this.categoriaService.setCategoriaCambio(data);
          this.categoriaService.setMenajeCambio('Se modifico la categoria')
        });
      });
    }else{
      //registrar
      this.categoriaService.registrar(categoria).pipe(switchMap(() => {
        return this.categoriaService.listar();
      })).subscribe(data => {
        this.categoriaService.setCategoriaCambio(data)
        this.categoriaService.setMenajeCambio('Se registro la categoria')
      })
    }

    this.router.navigate(['/categoria'])

  }
}
