import { Routes } from '@angular/router';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { CrearProductosComponent } from './crear-productos/crear-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';

export const ProductosRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'listar',
      component: ListarProductosComponent
    }]
  },
  {
    path: '',
    children: [{
      path: 'crear',
      component: CrearProductosComponent
    }]
  },
  {
    path: '',
    children: [{
      path: 'editar/:id',
      component: EditarProductosComponent
    }]
  }
];

