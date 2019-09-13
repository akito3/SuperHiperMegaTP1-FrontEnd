var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';
import swal from 'sweetalert2';
var CrearCategoriasComponent = /** @class */ (function () {
    function CrearCategoriasComponent(formBuilder, servicioAgregar, router) {
        this.formBuilder = formBuilder;
        this.servicioAgregar = servicioAgregar;
        this.router = router;
    }
    CrearCategoriasComponent.prototype.ngOnInit = function () {
        this.form = this.formBuilder.group({
            descripcion: new FormControl(''),
            flagVisible: new FormControl(''),
            posicion: new FormControl(''),
        });
    };
    CrearCategoriasComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.form.value);
        this.servicioAgregar.agregarCategoria(this.form.value).subscribe(function (data) { return _this.categoria; });
        console.log('categoria agregada');
        swal({
            title: 'Guardado',
            text: 'La categoria se ha almacenado correctamente',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success',
        }).catch(swal.noop);
        this.onClickListar();
    };
    CrearCategoriasComponent.prototype.onClickListar = function () {
        this.router.navigate(['dashboard/categorias/listar']);
    };
    CrearCategoriasComponent.prototype.showSwal = function () {
        swal({
            title: 'Guardado',
            text: 'La categoria se ha almacenado correctamente',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success',
            type: 'success'
            // tslint:disable-next-line: deprecation
        }).catch(swal.noop);
    };
    CrearCategoriasComponent = __decorate([
        Component({
            selector: 'app-crear-categorias',
            templateUrl: './crear-categorias.component.html',
            styleUrls: ['./crear-categorias.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            CategoriasService,
            Router])
    ], CrearCategoriasComponent);
    return CrearCategoriasComponent;
}());
export { CrearCategoriasComponent };
//# sourceMappingURL=crear-categorias.component.js.map