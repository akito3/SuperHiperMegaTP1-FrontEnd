import { AgregarArchivosComponent } from './fichasclinicas/agregararchivos/agregararchivos.component';
import { ListarCategoriasComponent } from './categorias/listar-categorias/listar-categorias.component';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedpluginModule } from './shared/fixedplugin/fixedplugin.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutingModule } from '../app/app.routing';
import { AppRoutes } from './app.routing';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ListarfichasComponent, DialogFichasClinicas } from './fichasclinicas/listarfichas/listarfichas.component';
import { AgregarfichasComponent } from './fichasclinicas/agregarfichas/agregarfichas.component';
import { ListarComponent, DialogOverviewExampleDialog } from './reservas/listar/listar.component';
import { AgregarReservasComponent } from './reservas/agregar-reservas/agregar-reservas.component';
import { ListarServiciosComponent } from './servicios/listar-servicios/listar-servicios.component';
import { CrearModificarServiciosComponent, DialogCrearCabeceraServicio, DialogCrearDetalleAsociado } from './servicios/crear-modificar-servicios/crear-modificar-servicios.component';
import { ListarDetallesAsociadosComponent, DialogAgregarNuevoDetalle, DialogEliminarDetalle } from './servicios/detalles/listar-detalles-asociados/listar-detalles-asociados.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ModalFisioterapeutasComponent } from './util/modal-fisioterapeutas/modal-fisioterapeutas.component';
import { ModalClientesComponent } from './util/modal-clientes/modal-clientes.component';
import { ArchivosComponent } from './fichasclinicas/archivos/archivos.component';
import { ListarComisionesComponent, DialogComisiones } from './comisionEmpleados/listar-comisiones/listar-comisiones.component';
import { CrearComisionComponent } from './comisionEmpleados/crear-comision/crear-comision.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    // tslint:disable-next-line: deprecation
    HttpModule,
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedpluginModule,
    AppRoutingModule,
    MaterialModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LoginComponent,
    ListarfichasComponent,
    AgregarfichasComponent,
    AgregarArchivosComponent,
    ArchivosComponent,
    ListarComponent,
    AgregarReservasComponent,
    //AGREGAR AQUI EL DIALOG DE MATERIAL DESIGN
    DialogOverviewExampleDialog,
    DialogFichasClinicas,
    ListarServiciosComponent,
    CrearModificarServiciosComponent,
    DialogCrearCabeceraServicio,
    DialogCrearDetalleAsociado,
    ListarDetallesAsociadosComponent,
    DialogAgregarNuevoDetalle,
    DialogEliminarDetalle,
    ReportesComponent,
    ModalFisioterapeutasComponent,
    ModalClientesComponent,
    ListarComisionesComponent,
    CrearComisionComponent,
    DialogComisiones
  ],
  entryComponents:[
    //AGREGAR COMO ENTRY POINT
    DialogOverviewExampleDialog,
    DialogFichasClinicas,
    DialogCrearCabeceraServicio,
    DialogCrearDetalleAsociado,
    DialogAgregarNuevoDetalle,
    DialogEliminarDetalle,
    ModalFisioterapeutasComponent,
    ModalClientesComponent,
    DialogComisiones
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
