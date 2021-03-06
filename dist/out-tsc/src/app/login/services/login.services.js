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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from '../../util/constants';
import { map } from 'rxjs/operators';
var LoginService = /** @class */ (function () {
    function LoginService(httpClient) {
        this.httpClient = httpClient;
    }
    LoginService.prototype.loginUsuario = function (usuario, password) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        var url = API_ENDPOINT + 'stock-pwfe/persona';
        return this.httpClient.get(url, { headers: headers }).
            pipe(map(function (objeto) {
            return objeto['lista'].filter(function (elemento) { return elemento['usuarioLogin'] != null && elemento['usuarioLogin'] == usuario && elemento['cedula'] == password; });
        }), map(function (objeto) {
            if (objeto.length == 0) {
                throw new Error("Usuario/Contrasena Invalido");
            }
            else {
                return objeto;
            }
        }));
    };
    LoginService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], LoginService);
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=login.services.js.map