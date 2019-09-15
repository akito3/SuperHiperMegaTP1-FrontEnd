import { Routes } from '@angular/router';
import { GenerarReportesComponent } from './generar-reportes/generar-reportes.component';

export const ReportesRoutes: Routes = [
{
  path: '',
  children: [{
    path: 'generar',
    component: GenerarReportesComponent
  }]
}];
