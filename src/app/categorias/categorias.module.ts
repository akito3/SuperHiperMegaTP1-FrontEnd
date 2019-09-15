import { ListarCategoriasComponent, DialogOverviewExampleDialog } from './listar-categorias/listar-categorias.component';
import { CategoriasRoutes } from './categorias.routing';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';



import { MaterialModule } from '../material.module';
import { CrearCategoriasComponent } from './crear-categorias/crear-categorias.component';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from '../categorias/listar-categorias/listar-categorias.component';
import { MatAutocompleteModule } from '@angular/material';
import { MdModule } from '../md/md.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CategoriasRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MdModule
    ],
    declarations: [DialogOverviewExampleDialog, ListarCategoriasComponent, CrearCategoriasComponent, EditarCategoriasComponent],
    providers: [
        {
          provide: MatPaginatorIntl,
          useClass: MatPaginatorIntlCro
        },
    ],
    entryComponents: [DialogOverviewExampleDialog]
})

export class CategoriasModule { }
