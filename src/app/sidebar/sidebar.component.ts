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
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
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
    path: './fichas-clinicas',
    title: 'Fichas Clinicas',
    type: 'sub',
    icontype: 'image',
    collapse: 'fichas',
    children: [
        { path: 'listar-fichas-clinicas', title: 'Listar Fichas Clinicas', ab: 'LFC' },
        { path: 'timeline', title: 'Timeline Page', ab: 'TP' },
        { path: 'login', title: 'Login Page', ab: 'LP' },
        { path: 'register', title: 'Register Page', ab: 'RP' },
        { path: 'lock', title: 'Lock Screen Page', ab: 'LSP' },
        { path: 'user', title: 'User Page', ab: 'UP' }
    ]
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
