import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { Routes } from '@angular/router';
import { CrearCategoriasComponent } from './crear-categorias/crear-categorias.component';

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
}];
