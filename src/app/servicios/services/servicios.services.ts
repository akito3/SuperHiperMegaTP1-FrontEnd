import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_ENDPOINT } from '../../util/constants';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomURLEncoder } from 'src/app/util/customUrlEncoder';


@Injectable({
    providedIn: 'root'
})
export class ServiciosService {
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
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idEmpleado\":{\"idPersona\":" + parseInt(objeto["idFisioterapeuta"]) + "},\"idCliente\":{\"idPersona\":" +parseInt(objeto["idPaciente"]) + "}}");
        return this.httpClient.get(url, { headers: header, params : params });

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
        var params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() });
        if (objeto["fechadesde"] && objeto["fechahasta"]) {
            params = params.set("ejemplo", "{\"fechaDesdeCadena\":" + "\"" + objeto["fechadesde"] + "\" , \"fechaHastaCadena\": " + "\"" + objeto["fechahasta"] + "\"}");

        } else if (objeto["idPaciente"]) {

            params = params.set("ejemplo", "{\"idFichaClinica\" : " + "{\"idCliente\" :{\"idPersona\":" + parseInt(objeto["idPaciente"]) + "}}}");
        } else if (objeto["idFisioterapeuta"]) {
            params = params.set("ejemplo", "{\"idEmpleado\":{\"idPersona\":" + parseInt(objeto["idFisioterapeuta"]) + "}}}");

        }
        return this.httpClient.get(url, { params: params, headers: headers })
    }

    crearCabeceraServicios(objeto){
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario' : 'gustavo'

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/servicio';
        return this.httpClient.post(url,objeto,{headers : headers});

    }

    getPresentaciones(idTipoProducto){
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario' : 'gustavo'

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/presentacionProducto';
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idProducto\":{\"idTipoProducto\":" + idTipoProducto + "}}")

        return this.httpClient.get(url,{headers : headers, params : params});





    
    }

    getPrecio(idPresentacion){
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario' : 'gustavo'

        });

        const url: string = API_ENDPOINT + 'stock-pwfe/existenciaProducto';
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idPresentacionProductoTransient\":" +  idPresentacion + "}")
        return this.httpClient.get(url,{headers : headers, params : params});


    }

    agregarDetalleAsociado(objeto){
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario' : 'gustavo'

        });
        console.log("El objeto a enviar es ", objeto);
        const url: string = API_ENDPOINT + 'stock-pwfe/servicio/'+ objeto["idServicio"]["idServicio"]+"/detalle";
        return this.httpClient.post(url,objeto , {headers : headers});




    }

    getDetallesAsociados(idservicio){

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',

        });
        console.log("idservicio",idservicio);
        const url: string = API_ENDPOINT + 'stock-pwfe/servicio/'+idservicio+"/detalle";
        return this.httpClient.get(url, {headers : headers});




    }

    eliminarDetalleAsociado(idServicio, idDetalle){

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario' : 'gustavo',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/servicio/'+idServicio+"/detalle/"+idDetalle;
        return this.httpClient.delete(url,{headers:headers});

        


    }

    public getFichas(){


        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'usuario' : 'gustavo',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        return this.httpClient.get(url,{headers:headers});




    }

}
