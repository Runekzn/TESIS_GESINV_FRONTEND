import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Marca } from 'src/app/_model/marca';
import { MarcaService } from 'src/app/_service/marca.service';

@Component({
  selector: 'app-marca-edicion',
  templateUrl: './marca-edicion.component.html',
  styleUrls: ['./marca-edicion.component.css']
})
export class MarcaEdicionComponent implements OnInit {

  id:number = 0;
  edicion:boolean = false;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
    private marcaService: MarcaService,
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
      this.marcaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id':new FormControl(data.idMarca),
          'descripcion': new FormControl(data.descripcion)
        });
      });
    }
  }


  operar(){
    let marca = new Marca()
    marca.idMarca = this.form.get('id').value;
    marca.descripcion = this.form.get('descripcion').value;

    if(this.edicion){
      //Modificar.
      this.marcaService.modificar(marca).subscribe(()=>{
        this.marcaService.listar().subscribe(data =>{
          this.marcaService.setMarcaCambio(data);
          this.marcaService.setMenajeCambio('Se modifico la categoria')
        });
      });
    }else{
      //registrar
      this.marcaService.registrar(marca).pipe(switchMap(() => {
        return this.marcaService.listar();
      })).subscribe(data => {
        this.marcaService.setMarcaCambio(data)
        this.marcaService.setMenajeCambio('Se registro la categoria')
      })
    }

    this.router.navigate(['/marca'])
  }
}
