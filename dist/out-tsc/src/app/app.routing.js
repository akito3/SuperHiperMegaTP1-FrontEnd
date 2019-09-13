var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../app/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { ListarfichasComponent } from './fichasclinicas/listarfichas/listarfichas.component';
export var AppRoutes = [
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
                    }
                ]
            },
            {
                path: 'categorias',
                loadChildren: './categorias/categorias.module#CategoriasModule'
            },
            {
                path: 'forms',
                loadChildren: './forms/forms.module#Forms'
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
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(AppRoutes, { useHash: true }),
            ],
            exports: [RouterModule],
            declarations: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
/*
    ,

];
*/
//# sourceMappingURL=app.routing.js.map