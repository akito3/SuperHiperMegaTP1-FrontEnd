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
  header = new HttpHeaders({
    'Content-Type': "application/json",
    'Accept': 'application/json',
    // 'usuario' : localStorage.getItem("usuarioLogin"),
    'usuario' : 'pedro'
  });
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

      if (filters[k] == null) {

        continue; }
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
    params = params.append('ejemplo', argumento);      

  return this.httpClient.get<ListaIdProductos>(url, {params: params} );
        
  }
  getProductoById(idPresentacionProducto: number): Observable<Productos> {
    console.log("gerProductoById");
    return this.httpClient.get<Productos>(this.baseUrl + '/' + idPresentacionProducto);
  }

  createProducto(producto: Productos) {

    console.log("createProducto");
    this.cuerpo = JSON.stringify(producto);
    console.log("cuerpo: ", this.cuerpo);

    return this.httpClient.post<Productos>(this.baseUrl, this.cuerpo, { headers: this.header });
  }

  editProducto(producto: Productos): Observable<Productos> {
    console.log("editProducto");
    this.cuerpo["idPresentacionProducto"] = producto.idPresentacionProducto;
    this.cuerpo["nombre"] = producto.nombre;
    this.cuerpo["descripcion"] = producto.descripcion;
    this.cuerpo["idProducto"] =   producto.idProducto  ;
    const params = new HttpParams().set('Content-Type', 'application/json');
    const options = { params: params };
    console.log("cuerpo: ", this.cuerpo);
    console.log("prducto: ", producto);
    return this.httpClient.put<Productos>(this.baseUrl, this.cuerpo, { headers: this.header } );
  }

  deleteProducto(idPresentacionProducto: number) {
    console.log("deleteProducto");
    console.log("idPresentacionProducto: ",idPresentacionProducto);
    return this.httpClient.delete<Productos>(this.baseUrl + '/' + idPresentacionProducto).pipe(map(data => data));
  }

}
