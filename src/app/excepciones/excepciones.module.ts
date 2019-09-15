import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';



import { MaterialModule } from '../material.module';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro, DialogOverviewExampleDialog } from '../categorias/listar-categorias/listar-categorias.component';
import { MatAutocompleteModule } from '@angular/material';
import { MdModule } from '../md/md.module';
import { ExcepcionesRoutes } from './excepciones.routing';
import { ConfigurarExcepcionesComponent } from './configurar-excepciones/configurar-excepciones.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ExcepcionesRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MdModule
    ],
    declarations: [DialogOverviewExampleDialog, ConfigurarExcepcionesComponent],
    providers: [
        {
          provide: MatPaginatorIntl,
          useClass: MatPaginatorIntlCro
        },
    ],
    entryComponents: [DialogOverviewExampleDialog]
})

export class ExcepcionesModule { }
