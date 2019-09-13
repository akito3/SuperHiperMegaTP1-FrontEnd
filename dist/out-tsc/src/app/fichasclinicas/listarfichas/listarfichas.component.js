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
import { FichasClinicasService } from '../services/fichasClinicas.services';
var ListarfichasComponent = /** @class */ (function () {
    function ListarfichasComponent(
    //Dependency injection
    fichasClinicasService) {
        this.fichasClinicasService = fichasClinicasService;
        this.parametros_busqueda = { 'idFisioterapeuta': undefined, 'idPaciente': undefined };
    }
    ListarfichasComponent.prototype.ngOnInit = function () {
        this.cargarListaFichasClinicas();
        this.cargarComboBoxFisioterapeutas();
        this.cargarComboBoxPacientes();
        this.cargarComboBoxCategorias();
    };
    ListarfichasComponent.prototype.onChange = function (dato, nombre) {
        if (nombre == "idFisioterapeuta") {
            this.parametros_busqueda["idFisioterapeuta"] = dato;
            console.log(this.parametros_busqueda);
            this.getFichasPorFisioterapeuta(this.parametros_busqueda["idFisioterapeuta"]);
        }
        else if (nombre == "idPaciente") {
            console.log('paciente');
            this.parametros_busqueda["idPaciente"] = dato;
            console.log(this.parametros_busqueda);
            this.getFichasPorPaciente(this.parametros_busqueda["idPaciente"]);
        }
        else if (nombre == "idCategoria") {
            this.parametros_busqueda["idCategoria"] = dato;
            this.cargarComboBoxTipoDeProductos(this.parametros_busqueda['idCategoria']);
            console.log(this.parametros_busqueda);
        }
        else if (nombre == "idTipoProducto") {
            this.parametros_busqueda["idTipoProducto"] = dato;
            console.log(this.parametros_busqueda);
            this.getFichasPorTipoProducto(this.parametros_busqueda["idTipoProducto"]);
        }
    };
    ListarfichasComponent.prototype.getFichasPorPaciente = function (idPaciente) {
        var _this = this;
        this.fichasClinicasService.getFichasPorPaciente(idPaciente).subscribe(function (response) {
            _this.fichasClinicas = response.lista;
            console.log('A', _this.fichasClinicas);
        }, function (error) {
            console.log('Error', error.message);
        });
    };
    ListarfichasComponent.prototype.getFichasPorFisioterapeuta = function (idFisioterapeuta) {
        var _this = this;
        this.fichasClinicasService.getFichasPorFisioterapeuta(idFisioterapeuta).subscribe(function (response) {
            _this.fichasClinicas = response.lista;
            console.log('B', _this.fichasClinicas);
        }, function (error) {
            console.log('Error', error.message);
        });
    };
    ListarfichasComponent.prototype.getFichasPorTipoProducto = function (idTipoProducto) {
        var _this = this;
        this.fichasClinicasService.getFichasPorTipoDeProducto(idTipoProducto).subscribe(function (response) {
            _this.fichasClinicas = response.lista;
            console.log('C', _this.fichasClinicas);
        }, function (error) {
            console.log('Error', error.message);
        });
    };
    ListarfichasComponent.prototype.cargarComboBoxFisioterapeutas = function () {
        var _this = this;
        this.fichasClinicasService.getFisioterapeutas().subscribe(function (response) {
            _this.fisioterapeutas = response;
        }, function (error) {
            console.log('Error : ', error.message);
        });
    };
    ListarfichasComponent.prototype.cargarComboBoxTipoDeProductos = function (idCategoria) {
        var _this = this;
        this.fichasClinicasService.getTipoProducto(idCategoria).subscribe(function (response) {
            _this.tipoProductos = response.lista;
            console.log('Los productos', _this.tipoProductos);
        }, function (error) {
            console.log('Error ', error.message);
        });
    };
    ListarfichasComponent.prototype.cargarComboBoxCategorias = function () {
        var _this = this;
        this.fichasClinicasService.getCategorias().subscribe(function (response) {
            _this.categorias = response.lista;
            console.log('Categorias ', _this.categorias);
        }, function (error) {
            console.log('Error ', error.message);
        });
    };
    ListarfichasComponent.prototype.cargarListaFichasClinicas = function () {
        var _this = this;
        this.fichasClinicasService.getFichasClinicas().subscribe(function (response) {
            _this.fichasClinicas = response.lista;
        }, function (error) {
            console.log('Error : ', error.message);
        });
    };
    ListarfichasComponent.prototype.cargarComboBoxPacientes = function () {
        var _this = this;
        this.fichasClinicasService.getPacientes().subscribe(function (response) {
            _this.pacientes = response;
        }, function (error) {
            console.log('Error : ', error.message);
        });
    };
    ListarfichasComponent = __decorate([
        Component({
            selector: 'app-listarfichas',
            templateUrl: './listarfichas.component.html',
            styleUrls: ['./listarfichas.component.css']
        }),
        __metadata("design:paramtypes", [FichasClinicasService])
    ], ListarfichasComponent);
    return ListarfichasComponent;
}());
export { ListarfichasComponent };
//# sourceMappingURL=listarfichas.component.js.map