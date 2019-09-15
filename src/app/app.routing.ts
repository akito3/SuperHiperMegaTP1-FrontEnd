import { ListarCategoriasComponent } from './categorias/listar-categorias/listar-categorias.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../app/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { ListarfichasComponent } from './fichasclinicas/listarfichas/listarfichas.component';
import { AgregarfichasComponent } from './fichasclinicas/agregarfichas/agregarfichas.component';
import { ListarComponent } from './reservas/listar/listar.component';
import { AgregarReservasComponent } from './reservas/agregar-reservas/agregar-reservas.component';
import { ListarServiciosComponent } from './servicios/listar-servicios/listar-servicios.component';
export const AppRoutes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent
    },
    {
        path: 'pages',
        children: [
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    {
        path: 'dashboard',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },

            {
                path: 'fichas-clinicas',
                children: [
                    {
                        path: 'listar-fichas-clinicas',
                        component: ListarfichasComponent
                    },
                    {
                        path: 'agregar-nueva-ficha-clinica/:idEmpleado/:idCliente',
                        component: AgregarfichasComponent


                    }
                ]
            },
            {
                path: 'reservas',
                children: [
                    {
                        path: 'listar-reservas',
                        component: ListarComponent
                    },
                    {
                        path : 'agregar-reservas',
                        component : AgregarReservasComponent

                    }
                   
                ]



            },
            {
                path : 'servicios',
                children : [
                    {

                        path: 'listar-servicios',
                        component : ListarServiciosComponent,

                    }

                ]


            },
            {
                path: 'categorias',
                loadChildren: './categorias/categorias.module#CategoriasModule'
            },
            {
                path: 'subcategorias',
                loadChildren: './subcategorias/subcategorias.module#SubCategoriasModule'
            },
            {
                path: 'reportes',
                loadChildren: './reportes/reportes.module#ReportesModule'
            },
            {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            },
            {
                path: 'maps',
                loadChildren: './maps/maps.module#MapsModule'
            },
            {
                path: 'widgets',
                loadChildren: './widgets/widgets.module#WidgetsModule'
            },
            {
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            },
            {
                path: 'calendar',
                loadChildren: './calendar/calendar.module#CalendarModule'
            },
            {
                path: '',
                loadChildren: './userpage/user.module#UserModule'
            },
            {
                path: '',
                loadChildren: './timeline/timeline.module#TimelineModule'
            }
        ]
    }
];



@NgModule({
    imports: [
        RouterModule.forRoot(AppRoutes, { useHash: true }),
    ],
    exports: [RouterModule],
    declarations: [

    ]
})
export class AppRoutingModule { }

/*
    ,

];
*/
