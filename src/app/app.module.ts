import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { ZonaComponent } from './pages/zona/zona.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { RolComponent } from './pages/rol/rol.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { HttpClientModule } from '@angular/common/http';
import { CategoriaEdicionComponent } from './pages/categoria/categoria-edicion/categoria-edicion.component';
import { MarcaEdicionComponent } from './pages/marca/marca-edicion/marca-edicion.component';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';
import { ProveedorEdicionComponent } from './pages/proveedor/proveedor-edicion/proveedor-edicion.component';
import { ZonaEdicionComponent } from './pages/zona/zona-edicion/zona-edicion.component';
import { RolEdicionComponent } from './pages/rol/rol-edicion/rol-edicion.component';
import { UsuarioEdicionComponent } from './pages/usuario/usuario-edicion/usuario-edicion.component';
import { VentasComponent } from './pages/ventas/ventas.component';

@NgModule({
  declarations: [
    AppComponent,
    ProveedorComponent,
    CategoriaComponent,
    MarcaComponent,
    ZonaComponent,
    ProductoComponent,
    UsuarioComponent,
    RolComponent,
    PrincipalComponent,
    NavbarComponent,
    CategoriaEdicionComponent,
    MarcaEdicionComponent,
    ProductoEdicionComponent,
    ProveedorEdicionComponent,
    ZonaEdicionComponent,
    RolEdicionComponent,
    UsuarioEdicionComponent,
    VentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

