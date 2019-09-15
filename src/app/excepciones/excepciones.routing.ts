import { ConfigurarExcepcionesComponent } from './configurar-excepciones/configurar-excepciones.component';
import { Routes } from '@angular/router';

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
    component: ConfigurarExcepcionesComponent
  }]
},
{
  path: '',
  children: [{
    path: 'editar/:id',
    component: ConfigurarExcepcionesComponent
  }]
}];
