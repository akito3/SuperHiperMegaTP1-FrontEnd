var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NavItemType } from '../../md/md.module';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import PerfectScrollbar from 'perfect-scrollbar';
var AdminLayoutComponent = /** @class */ (function () {
    function AdminLayoutComponent(router, location) {
        this.router = router;
        this.yScrollStack = [];
        this.location = location;
    }
    AdminLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        var elemMainPanel = document.querySelector('.main-panel');
        var elemSidebar = document.querySelector('.sidebar .sidebar-wrapper');
        this.location.subscribe(function (ev) {
            _this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationStart) {
                if (event.url != _this.lastPoppedUrl)
                    _this.yScrollStack.push(window.scrollY);
            }
            else if (event instanceof NavigationEnd) {
                if (event.url == _this.lastPoppedUrl) {
                    _this.lastPoppedUrl = undefined;
                    window.scrollTo(0, _this.yScrollStack.pop());
                }
                else
                    window.scrollTo(0, 0);
            }
        });
        this._router = this.router.events.filter(function (event) { return event instanceof NavigationEnd; }).subscribe(function (event) {
            elemMainPanel.scrollTop = 0;
            elemSidebar.scrollTop = 0;
        });
        var html = document.getElementsByTagName('html')[0];
        if (window.matchMedia("(min-width: 960px)").matches && !this.isMac()) {
            var ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
            html.classList.add('perfect-scrollbar-on');
        }
        else {
            html.classList.add('perfect-scrollbar-off');
        }
        this._router = this.router.events.filter(function (event) { return event instanceof NavigationEnd; }).subscribe(function (event) {
            _this.navbar.sidebarClose();
        });
        this.navItems = [
            { type: NavItemType.NavbarLeft, title: 'Dashboard', iconClass: 'fa fa-dashboard' },
            {
                type: NavItemType.NavbarRight,
                title: '',
                iconClass: 'fa fa-bell-o',
                numNotifications: 5,
                dropdownItems: [
                    { title: 'Notification 1' },
                    { title: 'Notification 2' },
                    { title: 'Notification 3' },
                    { title: 'Notification 4' },
                    { title: 'Another Notification' }
                ]
            },
            {
                type: NavItemType.NavbarRight,
                title: '',
                iconClass: 'fa fa-list',
                dropdownItems: [
                    { iconClass: 'pe-7s-mail', title: 'Messages' },
                    { iconClass: 'pe-7s-help1', title: 'Help Center' },
                    { iconClass: 'pe-7s-tools', title: 'Settings' },
                    'separator',
                    { iconClass: 'pe-7s-lock', title: 'Lock Screen' },
                    { iconClass: 'pe-7s-close-circle', title: 'Log Out' }
                ]
            },
            { type: NavItemType.NavbarLeft, title: 'Search', iconClass: 'fa fa-search' },
            { type: NavItemType.NavbarLeft, title: 'Account' },
            {
                type: NavItemType.NavbarLeft,
                title: 'Dropdown',
                dropdownItems: [
                    { title: 'Action' },
                    { title: 'Another action' },
                    { title: 'Something' },
                    { title: 'Another action' },
                    { title: 'Something' },
                    'separator',
                    { title: 'Separated link' },
                ]
            },
            { type: NavItemType.NavbarLeft, title: 'Log out' }
        ];
    };
    AdminLayoutComponent.prototype.ngAfterViewInit = function () {
        this.runOnRouteChange();
    };
    AdminLayoutComponent.prototype.isMap = function () {
        if (this.location.prepareExternalUrl(this.location.path()) === '/maps/fullscreen') {
            return true;
        }
        else {
            return false;
        }
    };
    AdminLayoutComponent.prototype.runOnRouteChange = function () {
        if (window.matchMedia("(min-width: 960px)").matches && !this.isMac()) {
            var elemSidebar = document.querySelector('.sidebar .sidebar-wrapper');
            var elemMainPanel = document.querySelector('.main-panel');
            var ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
            ps.update();
        }
    };
    AdminLayoutComponent.prototype.isMac = function () {
        var bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    };
    __decorate([
        ViewChild('sidebar', { static: false }),
        __metadata("design:type", Object)
    ], AdminLayoutComponent.prototype, "sidebar", void 0);
    __decorate([
        ViewChild(NavbarComponent, { static: false }),
        __metadata("design:type", NavbarComponent)
    ], AdminLayoutComponent.prototype, "navbar", void 0);
    AdminLayoutComponent = __decorate([
        Component({
            selector: 'app-layout',
            templateUrl: './admin-layout.component.html'
        }),
        __metadata("design:paramtypes", [Router, Location])
    ], AdminLayoutComponent);
    return AdminLayoutComponent;
}());
export { AdminLayoutComponent };
//# sourceMappingURL=admin-layout.component.js.map