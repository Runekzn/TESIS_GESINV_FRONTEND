import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Zona } from 'src/app/_model/zona';
import { ZonaService } from 'src/app/_service/zona.service';

@Component({
  selector: 'app-zona-edicion',
  templateUrl: './zona-edicion.component.html',
  styleUrls: ['./zona-edicion.component.css']
})
export class ZonaEdicionComponent implements OnInit {

  id:number = 0;
  edicion:boolean = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private zonaService: ZonaService,
    private router: Router
  ) { }

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
      this.zonaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id':new FormControl(data.idZona),
          'descripcion': new FormControl(data.descripcion)
        });
      });
    }
  }

  operar(){

    let zona = new Zona()
    zona.idZona = this.form.get('id').value;
    zona.descripcion = this.form.get('descripcion').value;

    if(this.edicion){
      //Modificar.
      this.zonaService.modificar(zona).subscribe(()=>{
        this.zonaService.listar().subscribe(data =>{
          this.zonaService.setZonaCambio(data);
          this.zonaService.setMenajeCambio('Se modifico la zona')
        });
      });
    }else{
      //registrar
      this.zonaService.registrar(zona).pipe(switchMap(() => {
        return this.zonaService.listar();
      })).subscribe(data => {
        this.zonaService.setZonaCambio(data)
        this.zonaService.setMenajeCambio('Se registro la zona')
      })
    }

    this.router.navigate(['/zona'])

  }
}
