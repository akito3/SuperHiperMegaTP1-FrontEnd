import { Injectable } from '@angular/core';
import { Categoria } from './categoria';
import { ListaCategoria } from '../services/categoria';
import { Observable, of } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map, retry, catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private basePath = '/stock-pwfe/categoria/';
  baseUrl = 'https://gy7228.myfoscam.org:8443/stock-pwfe/categoria/';
  constructor(private httpClient: HttpClient) { }
  private url_base = 'https://gy7228.myfoscam.org:8443/stock-pwfe/';

  getCategorias(): Observable<ListaCategoria> {
      let params = new HttpParams();
      params = params.append('size', '1000'); // Se recibe siempre el total de la lista para trabajar localmente
      params = params.append('page', '0');
      return this.httpClient.get<ListaCategoria>(this.baseUrl, {params});
    }

    getCategoriaById(id: number): Observable<Categoria> {
      return this.httpClient.get<Categoria>(this.baseUrl + id);
    }

    agregarCategoria(categoria: Categoria): Observable<Categoria>{
      return this.httpClient.post<Categoria>(this.baseUrl , categoria);
    }
    editar(categoria: Categoria): Observable<Categoria>{
      return this.httpClient.put<Categoria>(this.baseUrl + categoria.idCategoria, categoria);
    }
    borrarCategoria(id: number) {
      return this.httpClient
        .delete<Categoria>(this.baseUrl + id)
        .pipe(map(data => data));
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }


    public get(){
      let url = this.baseUrl;
      return this.httpClient.get(url)
    }
  
    public post(data){
      let url = this.baseUrl;
      return this.httpClient.post(url,data)
    }
  
    public put(data){
      let url = this.baseUrl;
      return this.httpClient.put(url,data)
    }
  
    public delete(id){
      let url = this.baseUrl + id;
      return this.httpClient.delete(url)
    }

    getCategorias1() : Observable<Categoria> {
      return this.httpClient.get<Categoria>(this.baseUrl);
    }
  
    getUserById(id: number): Observable<Categoria> {
      return this.httpClient.get<Categoria>(this.baseUrl + id);
    }
  
    createCategorias(categoria: Categoria): Observable<Categoria> {
      return this.httpClient.post<Categoria>(this.baseUrl, categoria);
    }
  
    updateCategorias(categoria: Categoria): Observable<Categoria> {
      return this.httpClient.put<Categoria>(this.baseUrl + categoria.idCategoria, categoria);
    }
  
    deleteCategorias(id: number): Observable<Categoria> {
      return this.httpClient.delete<Categoria>(this.baseUrl + id);
    }
}
