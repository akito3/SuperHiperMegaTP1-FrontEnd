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
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';
var ListarCategoriasComponent = /** @class */ (function () {
    function ListarCategoriasComponent(router, dataService) {
        this.router = router;
        this.dataService = dataService;
        this.displayedColumns = ['idCategoria', 'descripcion', 'accion'];
    }
    ListarCategoriasComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    ListarCategoriasComponent.prototype.ngOnInit = function () {
        this.getCategorias();
    };
    ListarCategoriasComponent.prototype.getCategorias = function () {
        var _this = this;
        this.dataService.getCategorias()
            .subscribe(function (response) {
            // this.data = response['lista']
            _this.dataSource = new MatTableDataSource(response.lista);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
            _this.totalCategorias = response['totalDatos'];
        });
    };
    ListarCategoriasComponent.prototype.onClickAgregar = function () {
        this.router.navigate(['dashboard/categorias/crear']);
    };
    ListarCategoriasComponent.prototype.onClickEditar = function (id) {
        this.router.navigate(['dashboard/categorias/editar/' + id]);
    };
    ListarCategoriasComponent.prototype.onDeleteCategoria = function (id) {
        var _this = this;
        if (confirm('Esta seguro que desea borrar la Categoria?')) {
            this.dataService.borrarCategoria(id).subscribe(function () {
                _this.getCategorias();
                alert('Categoría eliminada correctamente');
            }, function (error) {
                alert('La categoría esta en uso');
            });
        }
    };
    __decorate([
        ViewChild(MatPaginator, { static: false }),
        __metadata("design:type", MatPaginator)
    ], ListarCategoriasComponent.prototype, "paginator", void 0);
    __decorate([
        ViewChild(MatSort, { static: false }),
        __metadata("design:type", MatSort)
    ], ListarCategoriasComponent.prototype, "sort", void 0);
    ListarCategoriasComponent = __decorate([
        Component({
            selector: 'app-listar-categorias',
            templateUrl: './listar-categorias.component.html',
            styleUrls: ['./listar-categorias.component.css']
        }),
        __metadata("design:paramtypes", [Router, CategoriasService])
    ], ListarCategoriasComponent);
    return ListarCategoriasComponent;
}());
export { ListarCategoriasComponent };
//# sourceMappingURL=listar-categorias.component.js.map