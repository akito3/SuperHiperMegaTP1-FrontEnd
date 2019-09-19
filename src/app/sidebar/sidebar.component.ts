import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/pages/login',
    title: 'Login',
    type: 'link',
    icontype: 'person'
},
{
    path: './categorias/listar',
    title: 'Categorías',
    type: 'link',
    icontype: 'category'
},
{
    path: './subcategorias/listar',
    title: 'Sub Categorías',
    type: 'link',
    icontype: 'widgets'
},
{
    path: './pacientes/listar',
    title: 'Pacientes',
    type: 'link',
    icontype: 'accessibility'
},
{
    path: './productos/listar',
    title: 'Productos',
    type: 'link',
    icontype: 'accessible'
},
{
    path: './fichas-clinicas/listar-fichas-clinicas',
    title: 'Fichas Clinicas',
    type: 'link',
    icontype: 'list_alt',
},
{
    path: './excepciones/listar',
    title: 'Configurar Excepciones',
    type: 'link',
    icontype: 'event_busy',
},
{
    path: './servicios/listar-servicios',
    title: 'Servicios',
    type: 'link',
    icontype: 'games',
},
{
    path: './atencion/listar',
    title: 'Horario Atencion',
    type: 'link',
    icontype: 'list_alt',
},
{
    path: './reservas/listar-reservas',
    title: 'Reservas',
    type: 'link',
    icontype: 'recent_actors',
},
{
    path: './reportes',
    title: 'Reportes',
    type: 'link',
    icontype: 'insert_chart_outlined',
}];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ps: any;
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
