import { Routes } from '@angular/router';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { CrearPacientesComponent } from './crear-pacientes/crear-pacientes.component';
import { EditarPacientesComponent } from './editar-pacientes/editar-pacientes.component';

export const PacientesRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'listar',
      component: ListarPacientesComponent
    }]
  },
  {
    path: '',
    children: [{
      path: 'crear',
      component: CrearPacientesComponent
    }]
  },
  {
    path: '',
    children: [{
      path: 'editar/:id',
      component: EditarPacientesComponent
    }]
  }
];

