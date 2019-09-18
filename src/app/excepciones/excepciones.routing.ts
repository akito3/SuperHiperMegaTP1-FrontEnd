import { ConfigurarExcepcionesComponent } from './configurar-excepciones/configurar-excepciones.component';
import { Routes } from '@angular/router';
import { AgregarExcepcionComponent } from './agregar-excepciones/agregar-excepciones.component';

export const ExcepcionesRoutes: Routes = [
{
  path: '',
  children: [{
    path: 'listar',
    component: ConfigurarExcepcionesComponent
  }]
},
{
  path: '',
  children: [{
    path: 'crear',
    component: AgregarExcepcionComponent
  }]
},
{
  path: '',
  children: [{
    path: 'editar/:id',
    component: ConfigurarExcepcionesComponent
  }]
}];
