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
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
var CategoriasService = /** @class */ (function () {
    function CategoriasService(httpClient) {
        this.httpClient = httpClient;
        this.basePath = '/stock-pwfe/categoria/';
        this.baseUrl = 'https://gy7228.myfoscam.org:8443/stock-pwfe/categoria/';
        this.url_base = 'https://gy7228.myfoscam.org:8443/stock-pwfe/';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        this.httpOptions = {
            headers: this.headers
        };
    }
    CategoriasService.prototype.getCategorias = function () {
        var params = new HttpParams();
        params = params.append('size', '1000'); // Se recibe siempre el total de la lista para trabajar localmente
        params = params.append('page', '0');
        return this.httpClient.get(this.baseUrl, { params: params });
    };
    CategoriasService.prototype.getCategoriaById = function (id) {
        return this.httpClient.get(this.baseUrl + id);
    };
    CategoriasService.prototype.agregarCategoria = function (categoria) {
        return this.httpClient.post(this.baseUrl, categoria);
    };
    CategoriasService.prototype.borrarCategoria = function (id) {
        return this.httpClient
            .delete(this.baseUrl + id)
            .pipe(map(function (data) { return data; }));
    };
    CategoriasService.prototype.editarCategoria = function (categoria) {
        return this.httpClient.put(this.baseUrl + categoria.idCategoria, categoria, this.httpOptions);
    };
    CategoriasService.prototype.put = function (datos) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'usuario': 'gustavo'
        });
        return this.httpClient.put(this.url_base, datos, { headers: headers });
    };
    CategoriasService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], CategoriasService);
    return CategoriasService;
}());
export { CategoriasService };
//# sourceMappingURL=categorias.service.js.map