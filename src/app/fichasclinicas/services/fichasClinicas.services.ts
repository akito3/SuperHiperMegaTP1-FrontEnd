import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_ENDPOINT } from '../../util/constants';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomURLEncoder } from 'src/app/util/customUrlEncoder';


@Injectable({
    providedIn: 'root'
})
export class FichasClinicasService {
    constructor(private httpClient: HttpClient) {
    }



    getFichasClinicas(): Observable<any> {

        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/fichaClinica'
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

    getFichasClinicasPorFiltros(searchparams: any = null) {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        const url: string = API_ENDPOINT + 'stock-pwfe/categoria'

        return this.httpClient.get(url, { headers: header });

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
            'usuario' : localStorage.getItem("usuarioLogin"),
        });

        const url: string = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        let cuerpo = {};
        cuerpo["motivoConsulta"] = objeto["motivoConsulta"];
      //  cuerpo["fecha"] = "20191012";
        cuerpo["diagnostico"] = objeto["diagnostico"];
        cuerpo["observacion"] = objeto["observacion"];
        cuerpo["idCliente"] = {"idPersona" : objeto["idCliente"]};
        cuerpo["idEmpleado"]  =  {"idPersona" : objeto["idEmpleado"]};
        cuerpo["idTipoProducto"] = {"idTipoProducto" : objeto["idTipoProducto"]};
        console.log("cuerpo",cuerpo);
         return this.httpClient.post(url, cuerpo, { headers: header });
        
          
    }

    modificarFichaClinica(objeto){

        const header = new HttpHeaders({
            'Content-Type': "application/json",
            'Accept': 'application/json',
            'usuario' : localStorage.getItem("usuarioLogin"),
        });

        const url: string = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        console.log("Objeto", objeto);
        return this.httpClient.put(url, objeto,{headers:header});




    }

    getServiciosApartirDeFicha(idFicha){

        const header = new HttpHeaders({
            'Content-Type': "application/json",
            'Accept': 'application/json',
            'usuario' : localStorage.getItem("usuarioLogin"),
        });

        const url: string = API_ENDPOINT + 'stock-pwfe/servicio';
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idFichaClinica\":{\"idFichaClinica\":" + idFicha + "}}")
        return this.httpClient.get(url,{params : params , headers:header});

    }

    filtrar(objeto){
        const header = new HttpHeaders({
            'Content-Type': "application/json",
            'Accept': 'application/json',
            'usuario' : localStorage.getItem("usuarioLogin"),
        });

        const url: string = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idEmpleado\":{\"idPersona\":" + (objeto["idFisioterapeuta"]!=null ? parseInt(objeto["idFisioterapeuta"]) : null) + "}, \"idCliente\":{\"idPersona\": "+ (objeto["idPaciente"]!=null ? parseInt(objeto["idPaciente"]) : null) +"}, \"idTipoProducto\":"+ "{\"idTipoProducto\":" + (objeto["idTipoProducto"]!=null ? parseInt(objeto["idTipoProducto"]) : null) +"},\"fechaDesdeCadena\":" + (objeto["fechadesde"]!=null ? objeto["fechadesde"] : null) +"},\"fechahasta\" : " + (objeto["fechahasta"]!=null ? objeto["fechahasta"] : null)+"}}");
        return this.httpClient.get(url,{params : params , headers:header});







    }

    enviarArchivo(archivo: File): Observable<string>{
        let formData:FormData = new FormData();
        formData.append('file', archivo, archivo.name);
        let headers= new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');      
        return this.httpClient.post(API_ENDPOINT + '/stock-pwfe/fichaArchivo',formData,{headers: headers,observe: 'response', responseType:'text'}).pipe(map(result=>result.body));
    }



    getFichasArchivo(): Observable<any> {
        const headers = new HttpHeaders({

            'Content-Type': "application/json",
            'Accept': 'application/json',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/fichaArchivo';
        return this.httpClient.get(url, { headers: headers })
    }

    getArchivoApartirDeFicha(idFicha:any){
        console.log(idFicha);
        const header = new HttpHeaders({
            'Content-Type': "application/json",
            'Accept': 'application/json',
            'usuario' : localStorage.getItem("usuarioLogin"),
        });
        const url: string = API_ENDPOINT + 'stock-pwfe/fichaArchivo?idFichaClinica='+idFicha;
        console.log(url);
        return this.httpClient.get(url);

    }

    geta1(idTipoProducto): Observable<any> {
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            'Accept': 'application/json',

        });
        const url: string = API_ENDPOINT + 'stock-pwfe/fichaClinica';
        let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idTipoProducto\":{\"idTipoProducto\":" + idTipoProducto + "}}")
        console.log("params", params)
        return this.httpClient.get(url, { params: params, headers: headers })
    }

    borrarArchivo(id:any) {
        const header = new HttpHeaders({
            'Content-Type': "application/json",
            'Accept': 'application/json',
            'usuario' : localStorage.getItem("usuarioLogin"),
        });
        const url: string = API_ENDPOINT + 'stock-pwfe/fichaArchivo/'+id;
        console.log('url ' + url);
        return this.httpClient.delete(url);
      }
    

}
