import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriasService {

  base_path = 'https://gy7228.myfoscam.org:8443/stock-pwfe/';

  constructor(private http: HttpClient) { }

  getSubcategoria() {
    const url = this.base_path + 'tipoProducto';
    return this.http.get(url);
  }

  agregarSubcategoria(data) {
    const header = new HttpHeaders({
      'Content-Type': "application/json",
      'Accept': 'application/json',
      'usuario' : localStorage.getItem("usuarioLogin"),
  });
    const url = this.base_path + 'tipoProducto';
    return this.http.post(url, data, { headers: header });
  }

  modificarSubcategoria(data) {
    const header = new HttpHeaders({
      'Content-Type': "application/json",
      'Accept': 'application/json',
      'usuario' : localStorage.getItem("usuarioLogin"),
  });
    const url = this.base_path + 'tipoProducto';
    return this.http.put(url, data, { headers: header });
  }

  borrarSubcategoria(id) {
    const url = this.base_path + 'tipoProducto/' + id;
    return this.http.delete(url);
  }
  getCategoria(like) {
    let url = this.base_path + 'categoria?like=S';
    if (like.length > 0) {
      url = url + '&ejemplo=' + encodeURIComponent(JSON.stringify({
        descripcion: like
      }));
    }
    return this.http.get(url);
  }

  split(filters) {
    let separator = '?';
    let url = this.base_path + 'tipoProducto';
    for (const k in filters) {
      if (filters[k] === null) continue;
      url = url + separator + k + '=' + filters[k];
      separator = '&';
    }
    return this.http.get(url);
  }

}
