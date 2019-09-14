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
    ListarComponent,
    AgregarReservasComponent,
    //AGREGAR AQUI EL DIALOG DE MATERIAL DESIGN
    DialogOverviewExampleDialog,
    DialogFichasClinicas,
  ],
  entryComponents:[
    //AGREGAR COMO ENTRY POINT
    DialogOverviewExampleDialog,
    DialogFichasClinicas
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
