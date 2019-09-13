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
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';
var EditarCategoriasComponent = /** @class */ (function () {
    function EditarCategoriasComponent(formBuilder, servicioEditar, route, router) {
        this.formBuilder = formBuilder;
        this.servicioEditar = servicioEditar;
        this.route = route;
        this.router = router;
    }
    EditarCategoriasComponent.prototype.ngOnInit = function () {
        var id = +this.router.snapshot.paramMap.get('id'); // Se obtiene el id de la ruta para el servidor
        this.editarCategoria(id);
    };
    EditarCategoriasComponent.prototype.editarCategoria = function (id) {
        var _this = this;
        this.servicioEditar.getCategoriaById(id).subscribe(function (respuesta) {
            _this.categoria = respuesta;
            _this.cargarFormulario();
        }, function (error_respuesta) {
            console.log('Ha ocurrido un error al intentar cargar los datos');
        });
    };
    EditarCategoriasComponent.prototype.cargarFormulario = function () {
        this.form = this.formBuilder.group({
            idCategoria: new FormControl(this.categoria.idCategoria),
            descripcion: new FormControl(this.categoria.descripcion),
            flagVisible: 'S',
            posicion: 1
        });
    };
    EditarCategoriasComponent.prototype.onSubmit = function () {
        if (this.form.valid) {
            this.servicioEditar.put(this.form.value).subscribe(function (response) {
                console.log(response);
            });
        }
    };
    EditarCategoriasComponent.prototype.onClickListar = function () {
        this.route.navigate(['dashboard/categorias/listar']);
    };
    EditarCategoriasComponent = __decorate([
        Component({
            selector: 'app-editar-categorias',
            templateUrl: './editar-categorias.component.html',
            styleUrls: ['./editar-categorias.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            CategoriasService,
            Router,
            ActivatedRoute])
    ], EditarCategoriasComponent);
    return EditarCategoriasComponent;
}());
export { EditarCategoriasComponent };
//# sourceMappingURL=editar-categorias.component.js.map