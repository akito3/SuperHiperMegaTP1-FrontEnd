import { ReportesRoutes } from './reportes.routing';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';



import { MaterialModule } from '../material.module';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from '../categorias/listar-categorias/listar-categorias.component';
import { MatAutocompleteModule } from '@angular/material';
import { MdModule } from '../md/md.module';
import { GenerarReportesComponent } from './generar-reportes/generar-reportes.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ReportesRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MdModule
    ],
    declarations: [GenerarReportesComponent],
    providers: [
        {
          provide: MatPaginatorIntl,
          useClass: MatPaginatorIntlCro
        },
    ],
    entryComponents: []
})

export class ReportesModule { }
