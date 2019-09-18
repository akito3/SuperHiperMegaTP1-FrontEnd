import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { ProductosRoutes } from './productos.routing';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { CrearProductosComponent } from './crear-productos/crear-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ProductosRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    declarations: [ListarProductosComponent, CrearProductosComponent, EditarProductosComponent]
})

export class ProductosModule { }
