import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { Routes } from '@angular/router';

export const CategoriasRoutes: Routes = [
{
  path: '',
  children: [{
    path: '',
    component: ListarCategoriasComponent
  }]
}
];
