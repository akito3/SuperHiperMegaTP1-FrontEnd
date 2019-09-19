import { API_ENDPOINT } from './../../util/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  private url_base = "https://gy7228.myfoscam.org:8443/stock-pwfe/";
  //URL ='https://gy7228.myfoscam.org:8443/stock-pwfe/persona';
  URL = 'https://gy7228.myfoscam.org:8443/stock-pwfe/personaHorarioAgenda';
  urlActual;
  dia;
  empleado;
  inicio;
  cantidad;
  orderBy;
  orderDir;
  constructor(public http: HttpClient, ) {

    this.dia = null;
    this.empleado = null;
    this.inicio = null;
    this.cantidad = null;
    this.orderBy = null;
    this.orderDir = null;
  }
  public all() {
    let url = this.url_base + "persona"
    return this.http.get(url)
  }

  public get(filters) {
    let separator = '?'
    let url = this.url_base + "persona"
    for (let k in filters) {
      if (filters[k] == null) {
        continue
      }
      url = url + separator + k + "=" + filters[k]
      separator = "&"
    }
    console.log(url)
    return this.http.get(url)
  }

  public getTodos() {
    let url = this.url_base + 'persona?orderBy=apellido&orderDir=asc';
    return this.http.get(url);
  }

  public getTodosEmpleados() {
    let url = this.url_base + 'persona?orderBy=apellido&orderDir=asc&ejemplo=%7B"soloUsuariosDelSistema"%3Atrue%7D';
    return this.http.get(url);
  }

  public filtrarEmpleados(nombre?, apellido?) {
    let url = this.url_base + 'persona?orderBy=apellido&orderDir=asc&like=S&ejemplo=';
    if (nombre !== null && apellido !== null) {
      const query = { soloUsuariosDelSistema: true, nombre: nombre, apellido: apellido };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    } else if (nombre !== null && apellido === null) {
      const query = { soloUsuariosDelSistema: true, nombre: nombre };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    } else if (nombre === null && apellido !== null) {
      const query = { soloUsuariosDelSistema: true, apellido: apellido };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    } else {
      const query = { soloUsuariosDelSistema: true };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    }
    return this.http.get(url);
  }

  public filtrarPacientes(nombre?, apellido?) {
    let url = this.url_base + 'persona?orderBy=apellido&orderDir=asc&like=S&ejemplo=';
    if (nombre !== null && apellido !== null) {
      const query = { nombre: nombre, apellido: apellido };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    } else if (nombre !== null && apellido === null) {
      const query = { nombre: nombre };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    } else if (nombre === null && apellido !== null) {
      const query = { apellido: apellido };
      const convertido = JSON.stringify(query);
      url = url + encodeURIComponent(convertido);
    }
    return this.http.get(url);
  }

  public post(data) {
    
    const body = JSON.stringify(data);
    let url = this.url_base + "persona"
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });

    return this.http.post(url, data, { headers })
  }

  public put(data) {
    const body = JSON.stringify(data);
    let url = this.url_base + "persona/"
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });

    return this.http.put(url, data, { headers })
  }

  public delete(id) {
    let url = this.url_base + "persona/" + id
    return this.http.delete(url)
  }

  getPersona(dia?, empleado?, inicio?, cantidad?, orderBy?, orderDir?) {
    this.dia = null;
    this.empleado = null;
    this.inicio = null;
    this.cantidad = null;
    this.orderBy = null;
    this.orderDir = null;
    if (dia != null) {
      this.dia = dia;
    }
    if (empleado != null) {
      this.empleado = empleado;
    }
    if (inicio != null) {
      this.inicio = inicio;
    }
    if (cantidad != null) {
      this.cantidad = cantidad;
    }
    if (orderBy != null) {
      this.orderBy = orderBy;
    }
    if (orderDir != null) {
      this.orderDir = orderDir;
    }
    this.generarUrl();
    return this.http.get(this.urlActual);

  }

  getEmpleados() {
    return this.http.get('https://gy7228.myfoscam.org:8443/stock-pwfe/persona?orderBy=idPersona&orderDir=asc');
  }

  public post1(datos) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'gustavo'
    });
    return this.http.post(this.URL, datos, { headers });
  }

  public put1(datos) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'gustavo'
    });
    return this.http.put(this.URL, datos, { headers });
  }

  public delete1(id) {
    const url = this.URL + '/' + id;
    return this.http.delete(url);
  }


  generarUrl() {
    let primero = 1;
    if (
      this.dia != null ||
      this.empleado != null ||
      this.inicio != null ||
      this.cantidad != null ||
      this.orderBy != null ||
      this.orderDir != null
    ) {
      this.urlActual = this.URL + '?';
      if (this.inicio != null) {
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'inicio=' + this.inicio;
      }
      if (this.cantidad != null) {
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'cantidad=' + this.cantidad;
      }
      if (this.orderBy != null) {
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'orderBy=' + this.orderBy;
      }
      if (this.orderDir != null) {
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'orderDir=' + this.orderDir;
      }
      if (this.empleado != null && this.dia == null) {
        const query = { idEmpleado: { idPersona: this.empleado } };
        const convertido = JSON.stringify(query);
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'ejemplo=' + encodeURIComponent(convertido);
      } else if (this.empleado != null && this.dia != null) {
        const query = { dia: this.dia, idEmpleado: { idPersona: this.empleado } };
        const convertido = JSON.stringify(query);
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'ejemplo=' + encodeURIComponent(convertido);
      } else {
        const query = { dia: this.dia };
        const convertido = JSON.stringify(query);
        if (primero === 0) {
          this.urlActual = this.urlActual + '&';
        } else {
          primero = 0;
        }
        this.urlActual = this.urlActual + 'ejemplo=' + encodeURIComponent(convertido);
      }
    } else {
      this.urlActual = this.URL + '/';
    }


  }

}
