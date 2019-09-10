import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { CategoriasRoutes } from './categorias.routing';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { MaterialModule } from '../material.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CategoriasRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [ListarCategoriasComponent]
})

export class CategoriasModule { }
