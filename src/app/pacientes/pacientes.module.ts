import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { PacientesRoutes } from './pacientes.routing';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { CrearPacientesComponent } from './crear-pacientes/crear-pacientes.component';
import { EditarPacientesComponent } from './editar-pacientes/editar-pacientes.component';
import { DialogPacientesComponent } from './dialog-pacientes/dialog-pacientes.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PacientesRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    declarations: [ListarPacientesComponent,
        CrearPacientesComponent,
        EditarPacientesComponent,
        DialogPacientesComponent
    ],
    entryComponents: [DialogPacientesComponent]
})

export class PacientesModule { }
