var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_ENDPOINT } from '../../util/constants';
import { map } from 'rxjs/operators';
import { CustomURLEncoder } from 'src/app/util/customUrlEncoder';
var FichasClinicasService = /** @class */ (function () {
    function FichasClinicasService(httpClient) {
        this.httpClient = httpClient;
    }
    FichasClinicasService.prototype.getFichasClinicas = function () {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        var url = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        return this.httpClient.get(url, { headers: headers });
    };
    FichasClinicasService.prototype.getFisioterapeutas = function () {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        var url = API_ENDPOINT + 'stock-pwfe/persona';
        return this.httpClient.get(url, { headers: headers }).
            pipe(map(function (objeto) {
            return objeto['lista'].filter(function (elemento) { return elemento['usuarioLogin'] != null; });
        }));
    };
    FichasClinicasService.prototype.getPacientes = function () {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        var url = API_ENDPOINT + 'stock-pwfe/persona';
        return this.httpClient.get(url, { headers: headers }).pipe(map(function (objeto) {
            return objeto['lista'].filter(function (elemento) { return !elemento['usuarioLogin']; });
        }));
    };
    FichasClinicasService.prototype.getCategorias = function () {
        var header = new HttpHeaders({
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
        });
        var url = API_ENDPOINT + 'stock-pwfe/categoria';
        return this.httpClient.get(url, { headers: header });
    };
    FichasClinicasService.prototype.getTipoProducto = function (idCategoria) {
        var header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        var url = API_ENDPOINT + "stock-pwfe/tipoProducto";
        var params = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idCategoria\":{\"idCategoria\":" + idCategoria + "}}");
        console.log(params);
        return this.httpClient.get(url, { headers: header, params: params });
    };
    FichasClinicasService.prototype.getFichasClinicasPorFiltros = function (searchparams) {
        if (searchparams === void 0) { searchparams = null; }
        var header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        var url = API_ENDPOINT + 'stock-pwfe/categoria';
        return this.httpClient.get(url, { headers: header });
    };
    FichasClinicasService.prototype.getFichasPorPaciente = function (idPaciente) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        var url = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        console.log('sdfsdfdsf');
        var params = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idCliente\":{\"idPersona\":" + idPaciente + "}}");
        return this.httpClient.get(url, { params: params, headers: headers });
    };
    FichasClinicasService.prototype.getFichasPorFisioterapeuta = function (idFisioterapeuta) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        var url = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        console.log('sdfsdfdsf');
        var params = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idEmpleado\":{\"idPersona\":" + idFisioterapeuta + "}}");
        return this.httpClient.get(url, { params: params, headers: headers });
    };
    FichasClinicasService.prototype.getFichasPorTipoDeProducto = function (idTipoProducto) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        var url = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        var params = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idTipoProducto\":{\"idTipoProducto\":" + idTipoProducto + "}}");
        console.log("params", params);
        return this.httpClient.get(url, { params: params, headers: headers });
    };
    FichasClinicasService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], FichasClinicasService);
    return FichasClinicasService;
}());
export { FichasClinicasService };
//# sourceMappingURL=fichasClinicas.services.js.map