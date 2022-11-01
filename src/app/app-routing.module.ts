import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { RolComponent } from './pages/rol/rol.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ZonaComponent } from './pages/zona/zona.component';
import { CategoriaEdicionComponent } from './pages/categoria/categoria-edicion/categoria-edicion.component';
import { MarcaEdicionComponent } from './pages/marca/marca-edicion/marca-edicion.component';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';
import { ProveedorEdicionComponent } from './pages/proveedor/proveedor-edicion/proveedor-edicion.component';
import { ZonaEdicionComponent } from './pages/zona/zona-edicion/zona-edicion.component';
import { RolEdicionComponent } from './pages/rol/rol-edicion/rol-edicion.component';
import { UsuarioEdicionComponent } from './pages/usuario/usuario-edicion/usuario-edicion.component';
import { VentasComponent } from './pages/ventas/ventas.component';

const routes: Routes = [
  /*{ path: 'heroes', component: HeroesComponent }*/
  { path: 'inicio', component: PrincipalComponent },
  { path: '', component: PrincipalComponent },
  {
    path: 'categoria',
    component: CategoriaComponent,
    children: [
      { path: 'categoria-nuevo', component: CategoriaEdicionComponent },
      { path: 'categoria-edicion/:id',component:CategoriaEdicionComponent}
    ],
  },
  {
    path: 'marca',
    component: MarcaComponent,
    children: [
      { path: 'marca-nuevo', component: MarcaEdicionComponent },
      { path: 'marca-edicion/:id',component: MarcaEdicionComponent}
    ],
  },
  {
    path: 'producto',
    component: ProductoComponent,
    children: [
      { path: 'producto-nuevo', component: ProductoEdicionComponent },
      { path: 'producto-edicion/:id',component: ProductoEdicionComponent}
    ],
  },
  {
    path: 'proveedor',
    component: ProveedorComponent,
    children: [
      { path: 'proveedor-nuevo', component: ProveedorEdicionComponent },
      { path: 'proveedor-edicion/:id',component: ProveedorEdicionComponent}
    ],
  },
  {
    path: 'rol',
    component: RolComponent,
    children: [
      { path: 'rol-nuevo', component: RolEdicionComponent },
      { path: 'rol-edicion/:id',component: RolEdicionComponent}
    ],
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    children: [
      { path: 'usuario-nuevo', component: UsuarioEdicionComponent },
      { path: 'usuario-edicion/:id',component: UsuarioEdicionComponent}
    ],
 },
  {
    path: 'zona',
    component: ZonaComponent,
    children: [
      { path: 'zona-nuevo', component: ZonaEdicionComponent },
      { path: 'zona-edicion/:id',component: ZonaEdicionComponent}
    ],
  },
  {
    path:'ventas',
    component:VentasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
