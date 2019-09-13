import { Routes } from '@angular/router';
import { ListarSubcategoriasComponent } from './listar-subcategorias/listar-subcategorias.component';
import { CrearSubcategoriasComponent } from './crear-subcategorias/crear-subcategorias.component';
import { EditarSubcategoriasComponent } from './editar-subcategorias/editar-subcategorias.component';

export const SubCategoriasRoutes: Routes = [
{
  path: '',
  children: [{
    path: 'listar',
    component: ListarSubcategoriasComponent
  }]
},
{
  path: '',
  children: [{
    path: 'crear',
    component: CrearSubcategoriasComponent
  }]
},
{
  path: '',
  children: [{
    path: 'editar/:id',
    component: EditarSubcategoriasComponent
  }]
}];
