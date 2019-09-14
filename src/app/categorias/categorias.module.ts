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


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CategoriasRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [DialogOverviewExampleDialog, ListarCategoriasComponent, CrearCategoriasComponent, EditarCategoriasComponent],
    entryComponents: [DialogOverviewExampleDialog]
})

export class CategoriasModule { }
