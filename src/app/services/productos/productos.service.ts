import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Productos, IdProducto, ListaProductos, ListaIdProductos, IdTipoProducto } from '../productos/productos';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private baseUrl = 'https://gy7228.myfoscam.org:8443/stock-pwfe/presentacionProducto';
  public cuerpo = {};
  // header = new HttpHeaders({
  //   'Content-Type': "application/json",
  //   'Accept': 'application/json',
  //   'usuario' : localStorage.getItem("usuarioLogin"),
  // });
  header = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json').set('usuario', 'gustavo');
  httpOptions = {
    headers: this.header
  };
  constructor(private httpClient: HttpClient) { }

  getProductos(): Observable<ListaProductos> {
    let params = new HttpParams();
    params = params.append('size', '1000');
    params = params.append('page', '0');
    return this.httpClient.get<ListaProductos>(this.baseUrl, { params });
  }

  split(filters) {
    let separator = '?';
    let url = this.baseUrl ;
    
    for (const k in filters) {
      if (filters[k] == null) { continue; }
      url = url + separator + k + '=' + filters[k];
      separator = '&';
    }
    console.log("url: ",url)
    return this.httpClient.get(url);
  }

  getProductosFiltro(parametro: any):Observable<ListaProductos> {

    let argumento = '';
    let params = new HttpParams();

    let url = this.baseUrl
    if (parametro.tipo === 'idTipoProducto') {
      argumento = '{"idProducto":{"idTipoProducto":{"idTipoProducto":' + parametro.valor.id + '}}}';
      params = params.append('ejemplo', argumento);
    }  else if (parametro.tipo === 'like') {
      argumento = '{"nombre":"' + parametro.valor.nombre + '"}';
      params = params.append('ejemplo', argumento);
      params = params.append('like', 'S');
    }  

    return this.httpClient.get<ListaProductos>(url, {params: params} );
  }

  getIdProductoFiltro(parametro: any): Observable<ListaIdProductos>{
    let url = 'https://gy7228.myfoscam.org:8443/stock-pwfe/producto'
    let argumento = '{"idTipoProducto":{"idTipoProducto":' + parametro.valor.id + '}}';
    let params = new HttpParams();

    params = params.append('Content-Type', "application/json");    

    params = params.append('ejemplo', argumento); 
    return this.httpClient.get<ListaIdProductos>(url, {params: params} );
        
  }
  getExistenciaProductoFiltro(parametro: any): Observable<any>{
    console.log("getExistenciaProductoFiltro");
    let url = 'https://gy7228.myfoscam.org:8443/stock-pwfe/existenciaProducto';
    console.log("url: ", url);
    let argumento = '{"idPresentacionProductoTransient":' + parametro.valor.id + '}}';
    console.log("argumento: ",argumento);
    let params = new HttpParams();
    params = params.append('ejemplo', argumento);      
    // params = params.append(this.header);
    this.header = this.header.append('ejemplo', argumento);
    console.log("header", this.header);
    let retorno = this.httpClient.get<any>(url, { params: params, headers: this.header });
    console.log("return es: ", retorno);
    return retorno;
        
  }
  getProductoById(idPresentacionProducto: number): Observable<Productos> {
    console.log("gerProductoById");
    return this.httpClient.get<Productos>(this.baseUrl + '/' + idPresentacionProducto);
  }

  getProductosByIdTipoProducto(tipoProducto: number): Observable<ListaProductos> {
    console.log("getProductosByIdTipoProducto");
    let argumento = '{"idProducto":{"idTipoProducto":{"idTipoProducto":' + tipoProducto + '}}}';
    let params = new HttpParams();

    params = params.append('Content-Type', "application/json");    

    params = params.append('ejemplo', argumento);
    let retorno =  this.httpClient.get<ListaProductos>(this.baseUrl, {params: params} );
    console.log("retorno: ",retorno);
    return retorno;
  }

  createProducto(objeto: any) {

    console.log("createProducto");

    let respuesta = this.httpClient.post<Productos>(this.baseUrl, objeto, this.httpOptions );
    console.log("respuesta: ",respuesta);
    console.log("obeto es: ", objeto);
    return  respuesta;
  }

  editProducto(objecto: any): Observable<Productos> {
    console.log("editProducto");
    
    const params = new HttpParams().set('Content-Type', 'application/json');
    const options = { params: params };
    
    return this.httpClient.put<Productos>(this.baseUrl, objecto, this.httpOptions );
  }

  deleteProducto(idPresentacionProducto: number) {
    console.log("deleteProducto");
    console.log("idPresentacionProducto: ",idPresentacionProducto);
    return this.httpClient.delete<Productos>(this.baseUrl + '/' + idPresentacionProducto).pipe(map(data => data));
  }

}
