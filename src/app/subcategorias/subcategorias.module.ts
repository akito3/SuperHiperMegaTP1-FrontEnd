import { SubCategoriasRoutes } from './subcategorias.routing';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ListarSubcategoriasComponent } from './listar-subcategorias/listar-subcategorias.component';
import { CrearSubcategoriasComponent } from './crear-subcategorias/crear-subcategorias.component';
import { EditarSubcategoriasComponent } from './editar-subcategorias/editar-subcategorias.component';

import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from '../categorias/listar-categorias/listar-categorias.component';
import { MatAutocompleteModule } from '@angular/material';
import { MdModule } from '../md/md.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SubCategoriasRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MdModule

    ],
    declarations: [ListarSubcategoriasComponent, CrearSubcategoriasComponent, EditarSubcategoriasComponent],
    providers: [
      {
        provide: MatPaginatorIntl,
        useClass: MatPaginatorIntlCro
      },
    ]
})

export class SubCategoriasModule { }
