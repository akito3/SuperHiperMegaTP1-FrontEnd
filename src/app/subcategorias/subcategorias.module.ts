import { SubCategoriasRoutes } from './subcategorias.routing';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ListarSubcategoriasComponent } from './listar-subcategorias/listar-subcategorias.component';
import { CrearSubcategoriasComponent } from './crear-subcategorias/crear-subcategorias.component';
import { EditarSubcategoriasComponent } from './editar-subcategorias/editar-subcategorias.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SubCategoriasRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [ListarSubcategoriasComponent, CrearSubcategoriasComponent, EditarSubcategoriasComponent]
})

export class SubCategoriasModule { }
