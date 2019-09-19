
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material';
import { AtencionRoutes } from './atencion.routing';
import { ListarAtencionComponent } from './listar-atencion/listar-atencion.component';
import { MaterialModule } from 'src/app/material.module';
import { MdModule } from 'src/app/md/md.module';
import { MatPaginatorIntlCro } from 'src/app/categorias/listar-categorias/listar-categorias.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AtencionRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MdModule
    ],
    declarations: [ListarAtencionComponent],
    providers: [
        {
          provide: MatPaginatorIntl,
          useClass: MatPaginatorIntlCro
        },
    ],
    entryComponents: []
})
export class AtencionModule { }
