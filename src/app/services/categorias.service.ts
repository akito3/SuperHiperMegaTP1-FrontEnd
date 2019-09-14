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
  private basePath = 'https://gy7228.myfoscam.org:8443/stock-pwfe/';
  constructor(private httpClient: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json').set('usuario', 'gustavo');
  httpOptions = {
    headers: this.headers
  };

  getCategorias(parametro): Observable<ListaCategoria> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      });
    return this.httpClient.get<ListaCategoria>(this.basePath, { headers: headers });
  }

  getCategoriaById(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(this.basePath + 'categoria/' + id, this.httpOptions);
  }
  
  split(filters) {
    let separator = '?';
    let url = this.basePath + 'categoria';
    for (const k in filters) {
      if (filters[k] == null) {continue; }
      url = url + separator + k + '=' + filters[k];
      separator = '&';
    }
    return this.httpClient.get(url);
  }

  agregarCategoria(objeto: any) {
    const url = this.basePath + 'categoria';
    return this.httpClient.post(url, objeto);
  }

  editarCategoria1(objeto) {
    const url = this.basePath + 'categoria';
    return this.httpClient.put(url, objeto, this.httpOptions);
  }



  editarCategoria(objeto){
    const header = new HttpHeaders({
        'Content-Type': "application/json",
        'Accept': 'application/json',
        'usuario' :'gustavo',
    });

    const url: string = 'https://gy7228.myfoscam.org:8443/' + 'stock-pwfe/categoria';
    return this.httpClient.put(url, objeto, { headers: header });

}


  borrarCategoria(id) {
    const url = this.basePath + 'categoria/' + id;
    return this.httpClient.delete(url, this.httpOptions);
  }


}
