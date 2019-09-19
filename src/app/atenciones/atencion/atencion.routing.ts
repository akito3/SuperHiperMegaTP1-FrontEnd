import { Routes } from '@angular/router';
import { ListarAtencionComponent } from './listar-atencion/listar-atencion.component';

export const AtencionRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'listar',
      component: ListarAtencionComponent
    }]
  }
  ];
  