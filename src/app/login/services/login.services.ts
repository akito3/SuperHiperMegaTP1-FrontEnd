import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from '../../util/constants';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { element } from 'protractor';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private httpClient: HttpClient) {
    }



    loginUsuario(usuario: String, password: String): Observable<any> {

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/persona'
        return this.httpClient.get(url, { headers: headers }).
            pipe(
                map(
                    (objeto) =>
                        objeto['lista'].filter(elemento => elemento['usuarioLogin'] != null && elemento['usuarioLogin'] == usuario && elemento['cedula'] == password)
                ),
                map((objeto: any) => {
                    if (objeto.length == 0) {
                        throw new Error("Usuario/Contrasena Invalido")
                    } else {
                        return objeto;
                    }

                }
                )
            )

    }


}