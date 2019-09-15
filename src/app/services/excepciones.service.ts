import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomURLEncoder } from 'src/app/util/customUrlEncoder';
import { API_ENDPOINT } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class ExcepcionesService {
  constructor(private httpClient: HttpClient) {
  }

  getExcepciones(): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    });
    const url: string = API_ENDPOINT + 'stock-pwfe/horarioExcepcion';
    return this.httpClient.get(url, { headers: headers });
  }
  getFisioterapeutas(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      });
      const url: string = API_ENDPOINT + 'stock-pwfe/persona';
      return this.httpClient.get(url, { headers: headers }).
        pipe(
            map(
                (objeto) =>
                    objeto['lista'].filter(elemento => elemento['usuarioLogin'] != null)
            )
        );
  }



  agregarExcepcion(objeto){



      const header = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'usuario' : 'gustavo',
      });

      const url: string = API_ENDPOINT + 'stock-pwfe/reserva';

      console.log('cuerpo', objeto);
      return this.httpClient.post(url, objeto, { headers: header });

  }

  modificarExcepcion(objeto){
      const header = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'usuario' : 'gustavo',
      });

      const url: string = API_ENDPOINT + 'stock-pwfe/reserva';
      return this.httpClient.put(url, objeto, { headers: header });





  }

  eliminarExcepcion(idReserva){
      const header = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'usuario' : 'gustavo',
      });

      const url: string = API_ENDPOINT + 'stock-pwfe/reserva/' + idReserva ;
      return this.httpClient.delete(url, { headers: header });




  }



  getReservasFiltradas(objeto) {
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': 'application/json',

    });
    const url: string = API_ENDPOINT + 'stock-pwfe/reserva';
    let params: HttpParams = new HttpParams({ encoder: new CustomURLEncoder() }).set("ejemplo", "{\"idEmpleado\":" + objeto["idFisioterapeuta"] + "}," + "\"fechaDesdeCadena\":" + objeto["fechadesde"] + ",\"fechaHastaCadena\":" + objeto["fechahasta"] + "}");
    return this.httpClient.get(url, { params: params, headers: headers })

}

}
