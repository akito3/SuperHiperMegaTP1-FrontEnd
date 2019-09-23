import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_ENDPOINT } from '../../util/constants';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomURLEncoder } from 'src/app/util/customUrlEncoder';


@Injectable({
    providedIn: 'root'
})
export class ComisionesServices {
    constructor(private httpClient: HttpClient) {
    }



    getServicios(): Observable<any> {

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/servicio'
        return this.httpClient.get(url, { headers: headers })


    }


    getServiciosReportes(): Observable<any> {

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/servicio?detalle=S'
        return this.httpClient.get(url, { headers: headers })


    }

    getFisioterapeutas(): Observable<any> {

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/persona'
        return this.httpClient.get(url, { headers: headers }).
            pipe(
                map(
                    (objeto) =>
                        objeto['lista'].filter(elemento => elemento['usuarioLogin'] != null)
                )


            )


    }

    getPacientes(): Observable<any> {
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/persona'
        return this.httpClient.get(url, { headers: headers }).pipe(
            map(
                (objeto) =>
                    objeto['lista'].filter(elemento => !elemento['usuarioLogin'])
            )


        )

    }

    getCategorias(): Observable<any> {

        const header = new HttpHeaders({
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
        });
        const url: string = API_ENDPOINT + 'stock-pwfe/categoria'

        return this.httpClient.get(url, { headers: header });


    }

    getTipoProducto(idCategoria) {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        const url: string = API_ENDPOINT + "stock-pwfe/tipoProducto";
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idCategoria\":{\"idCategoria\":" + idCategoria + "}}")
        console.log(params)
        return this.httpClient.get(url, { headers: header, params: params },



        );


    }

    getFichasClinicasFiltradoPorPacienteyFisioterapeuta(objeto) {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        console.log("ejecutando servicio")
        const url: string = API_ENDPOINT + 'stock-pwfe/fichaClinica'
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idEmpleado\":{\"idPersona\":" + parseInt(objeto["idFisioterapeuta"]) + "},\"idCliente\":{\"idPersona\":" + parseInt(objeto["idPaciente"]) + "}}");
        return this.httpClient.get(url, { headers: header, params: params });

    }

    getFichasPorPaciente(idPaciente): Observable<any> {
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        console.log('sdfsdfdsf')
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idCliente\":{\"idPersona\":" + idPaciente + "}}")

        return this.httpClient.get(url, { params: params, headers: headers })
    }

    getFichasPorFisioterapeuta(idFisioterapeuta): Observable<any> {
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        console.log('sdfsdfdsf')
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idEmpleado\":{\"idPersona\":" + idFisioterapeuta + "}}")

        return this.httpClient.get(url, { params: params, headers: headers })
    }

    getFichasPorTipoDeProducto(idTipoProducto): Observable<any> {
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idTipoProducto\":{\"idTipoProducto\":" + idTipoProducto + "}}")
        console.log("params", params)
        return this.httpClient.get(url, { params: params, headers: headers })
    }


    agregarFichaClinica(objeto) {
        const header = new HttpHeaders({
            'Content-Type': "application/json",
            'Accept': 'application/json',
            'usuario': 'gustavo',
        });

        const url: string = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        let cuerpo = {};
        cuerpo["motivoConsulta"] = objeto["motivoConsulta"];
        //  cuerpo["fecha"] = "20191012";
        cuerpo["diagnostico"] = objeto["diagnostico"];
        cuerpo["observacion"] = objeto["observacion"];
        cuerpo["idCliente"] = { "idPersona": objeto["idCliente"] };
        cuerpo["idEmpleado"] = { "idPersona": objeto["idEmpleado"] };
        cuerpo["idTipoProducto"] = { "idTipoProducto": objeto["idTipoProducto"] };
        console.log("cuerpo", cuerpo);
        return this.httpClient.post(url, cuerpo, { headers: header });


    }

    modificarFichaClinica(objeto) {

        const header = new HttpHeaders({
            'Content-Type': "application/json",
            'Accept': 'application/json',
            'usuario': 'gustavo',
        });

        const url: string = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        return this.httpClient.put(url, objeto, { headers: header });




    }

    getServiciosFiltrado(objeto): Observable<any> {
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/servicio';

        console.log("objeto", objeto);
        var params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() })
            .set("ejemplo", "{\"fechaDesdeCadena\":" + (objeto["fechadesde"] != null ? objeto["fechadesde"] : null) + ",\"fechaHastaCadena\":" + (objeto["fechahasta"] != null ? objeto["fechahasta"] : null) + ",\"idFichaClinica\":" + "{\"idCliente\":" + "{\"idPersona\":" + (objeto["idPaciente"] != null ? parseInt(objeto["idPaciente"]) : null) + "}},\"idEmpleado\":" + "{\"idPersona\":" + (objeto["idFisioterapeuta"] != null ? parseInt(objeto["idFisioterapeuta"]) : null) + "}}");
        return this.httpClient.get(url, { params: params, headers: headers })
    }

    crearCabeceraServicios(objeto) {
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario': localStorage.getItem("usuarioLogin"),

        });
        console.log("LOCALSTORAGE", localStorage.getItem("usuarioLogin"));
        const url: string = API_ENDPOINT + 'stock-pwfe/servicio';
        return this.httpClient.post(url, objeto, { headers: headers });

    }

    getPresentaciones(idTipoProducto) {
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario': localStorage.getItem("usuarioLogin"),

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/presentacionProducto';
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idProducto\":{\"idTipoProducto\":" + idTipoProducto + "}}")

        return this.httpClient.get(url, { headers: headers, params: params });






    }

    getPresentacionesTotal() {

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario': localStorage.getItem("usuarioLogin"),

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/presentacionProducto';
        return this.httpClient.get(url, { headers: headers });




    }

    getPrecio(idPresentacion) {
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario': localStorage.getItem("usuarioLogin"),

        });

        const url: string = API_ENDPOINT + 'stock-pwfe/existenciaProducto';
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idPresentacionProductoTransient\":" + idPresentacion + "}")
        return this.httpClient.get(url, { headers: headers, params: params });


    }

    agregarDetalleAsociado(objeto) {
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario': localStorage.getItem("usuarioLogin"),

        });
        console.log("El objeto a enviar es ", objeto);
        const url: string = API_ENDPOINT + 'stock-pwfe/servicio/' + objeto["idServicio"]["idServicio"] + "/detalle";
        return this.httpClient.post(url, objeto, { headers: headers });




    }

    getDetallesAsociados(idservicio) {

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',

        });
        console.log("idservicio", idservicio);
        const url: string = API_ENDPOINT + 'stock-pwfe/servicio/' + idservicio + "/detalle";
        return this.httpClient.get(url, { headers: headers });




    }

    eliminarDetalleAsociado(idServicio, idDetalle) {

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario': localStorage.getItem("usuarioLogin"),

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/servicio/' + idServicio + "/detalle/" + idDetalle;
        return this.httpClient.delete(url, { headers: headers });




    }

    public getFichas() {


        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario': localStorage.getItem("usuarioLogin"),

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        return this.httpClient.get(url, { headers: headers });




    }

    public filtrarReportes(objeto) {

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario': localStorage.getItem("usuarioLogin"),

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/servicio';
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("detalle", "S")
            .set("ejemplo", "{\"idServicio\":{\"idFichaClinica\":{\"idCliente\":{\"idPersona\":" + (objeto["idPaciente"] != null ? parseInt(objeto["idPaciente"]) : null) + "}},\"idEmpleado\":{\"idPersona\":" + (objeto["idFisioterapeuta"] != null ? parseInt(objeto["idFisioterapeuta"]) : null) + "},\"fechaDesdeCadena\":" + (objeto["fechadesde"] != null ? objeto["fechadesde"] : null) + ",\"fechaHastaCadena\":" + (objeto["fechaHastaCadena"] != null ? objeto["fechadesde"] : null) + "},\"idPresentacionProducto\":" + "{\"idPresentacionProducto\":" + (objeto["idpresentacionproducto"] != null ? parseInt(objeto["idpresentacionproducto"]) : null) + "}}");
        return this.httpClient.get(url, { headers: headers, params: params });



    }


    public getComisionesFiltrado(objeto) {

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario': localStorage.getItem("usuarioLogin"),

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/comisionEmpleado';
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() })
            .set("ejemplo", "{\"idEmpleado\":{\"idPersona\":" + (objeto["idFisioterapeuta"] != null ? parseInt(objeto["idFisioterapeuta"]) : null) + "},\"idPresentacionProducto\":" + "{\"idPresentacionProducto\":" + (objeto["idpresentacionproducto"] != null ? parseInt(objeto["idpresentacionproducto"]) : null) + "}}");

        return this.httpClient.get(url, { headers: headers, params: params });



    }

    public agregarComision(objeto){

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario': localStorage.getItem("usuarioLogin"),

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/comisionEmpleado';
        return this.httpClient.post(url, objeto, { headers: headers });




    }

    public modificarComision(objeto){

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario': localStorage.getItem("usuarioLogin"),

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/comisionEmpleado';
        return this.httpClient.put(url, objeto, { headers: headers });




    }



}
