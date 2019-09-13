import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { Routes } from '@angular/router';
import { CrearCategoriasComponent } from './crear-categorias/crear-categorias.component';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';

export const CategoriasRoutes: Routes = [
{
  path: '',
  children: [{
    path: 'listar',
    component: ListarCategoriasComponent
  }]
},
{
  path: '',
  children: [{
    path: 'crear',
    component: CrearCategoriasComponent
  }]
},
{
  path: '',
  children: [{
    path: 'editar/:id',
    component: EditarCategoriasComponent
  }]
}];
