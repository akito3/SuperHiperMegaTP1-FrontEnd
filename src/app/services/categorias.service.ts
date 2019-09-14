import { Categoria } from 'src/app/services/categoria';
import { Injectable } from '@angular/core';
import { ListaCategoria } from '../services/categoria';
import { Observable, of } from 'rxjs';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry, catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private basePath = '/stock-pwfe/categoria/';
  baseUrl = 'https://gy7228.myfoscam.org:8443/stock-pwfe/categoria/';
  constructor(private httpClient: HttpClient) { }
  private url_base = 'https://gy7228.myfoscam.org:8443/stock-pwfe/';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json').set('usuario', 'gustavo');
  httpOptions = {
    headers: this.headers
  };

  getCategorias(parametro): Observable<ListaCategoria> {
    let separator = '?';
    for (const e in parametro) {
      if (parametro[e] == null) {continue; }
      this.baseUrl = this.baseUrl + separator + e + '=' + parametro[e];
      separator = '&';
    }
    return this.httpClient.get<ListaCategoria>(this.baseUrl);
  }

    getCategoriass1(): Observable<ListaCategoria> {
      let params = new HttpParams();
      params = params.append('size', '1000'); // Se recibe siempre el total de la lista para trabajar localmente
      params = params.append('page', '0');
      return this.httpClient.get<ListaCategoria>(this.baseUrl, {params});
    }
    getCategoriaById(id: number): Observable<Categoria> {
      return this.httpClient.get<Categoria>(this.baseUrl + id);
    }

    agregarCategoria(categoria: Categoria): Observable<Categoria> {
      return this.httpClient.post<Categoria>(this.baseUrl , categoria, this.httpOptions);
    }

    borrarCategoria(id: number) {
      return this.httpClient
        .delete<Categoria>(this.baseUrl + id)
        .pipe(map(data => data));
    }

    editarCategoria12(categoria: Categoria): Observable<Categoria> {
      return this.httpClient.put<Categoria>(this.baseUrl + categoria.idCategoria, categoria, this.httpOptions);
    }


    editarCategori1a(categoria: Categoria): Observable<Categoria> {
      const params = new HttpParams().set('Content-Type', 'application/json');
      const options = {params: params};
      return this.httpClient.put<Categoria>(this.baseUrl + categoria.idCategoria, categoria, options);
    }

    editarCategoria(objeto) {
    const header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'usuario' : 'gustavo',
    });
    return this.httpClient.put(this.baseUrl, objeto, { headers: header });
  }

  eliminarCategoria(idCategoria) {
    const header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'usuario' : 'gustavo',
    });

    const url: string = this.baseUrl + idCategoria;
    return this.httpClient.delete(url, { headers: header });
  }
}
