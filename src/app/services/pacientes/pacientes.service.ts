import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Pacientes, ListaPacientes } from 'src/app/services/pacientes/pacientes';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private baseUrl = 'https://gy7228.myfoscam.org:8443/stock-pwfe/persona';
  header = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json').set('usuario', localStorage.getItem("usuarioLogin"));
  httpOptions = {
    headers: this.header
  };
  private cuerpo = {};
  constructor(private httpClient: HttpClient) { }
  
  getPacientes(): Observable<ListaPacientes> {
    let params = new HttpParams();
    params = params.append('size', '1000');
    params = params.append('page', '0');
    return this.httpClient.get<ListaPacientes>(this.baseUrl,  { headers: this.header   });
  }

  getPacientesFiltro(parametro: any): Observable<ListaPacientes> {
    console.log("getPacientesFiltro");

    console.log("----------");

    console.log("parametros: ", parametro);
    console.log("parametro.valor: ", parametro.valor);
    let argumento = '';
    let params = new HttpParams();
    // console.log("params: ", params);
    if (parametro.tipo === 'nombre') {
      argumento = '{"nombre":"' + parametro.valor.nombre + '"}';
      params = params.append('ejemplo', argumento);
    } else if (parametro.tipo === 'apellido') {
      console.log("filtro es apellido");
      params = params.append('inicio', '0');
      params = params.append('cantidad', parametro.valor.cantidad);
      params = params.append('orderBy', 'apellido');
      params = params.append('orderDir', parametro.valor.orderDir);
    } else if (parametro.tipo === 'like') {
      argumento = '{"nombre":"' + parametro.valor.nombre + '"}';
      params = params.append('like', 'S');
      params = params.append('ejemplo', argumento);
    } else if (parametro.tipo === 'fisioterapeutas') {
      params = params.append('ejemplo', '{"soloUsuariosDelSistema":true}');
    }
    
    console.log("argumento: ",argumento);
    console.log("params: ", params);
    console.log("URL: ", this.baseUrl);
    return this.httpClient.get<ListaPacientes>(this.baseUrl, {params : params });
  }

  getPacienteById(idPersona: number): Observable<Pacientes> {
    return this.httpClient.get<Pacientes>(this.baseUrl + '/' + idPersona);
  }

  split(filters) {
    // console.log("paciente.service split");
    // console.log("filters: ", filters);
    let separator = '?';
    let url = this.baseUrl ;
    
    for (const k in filters) {
      // console.log("k: ",k)
      // console.log("filter[k]: ", filters[k]);
      if (filters[k] == null) {
        // console.log("continue");
        continue; }
      url = url + separator + k + '=' + filters[k];
      separator = '&';
    }
    // console.log("url: ",url)
    // console.log("fin de split");
    return this.httpClient.get(url);
  }

  createPaciente(paciente: Pacientes): Observable<Pacientes> {
    this.cuerpo["nombre"] = paciente.nombre;
    this.cuerpo["apellido"] = paciente.apellido;
    this.cuerpo["ruc"] = paciente.ruc;
    this.cuerpo["cedula"] = paciente.cedula;
    this.cuerpo["fechaNacimiento"] = paciente.fechaNacimiento;
    this.cuerpo["email"] = paciente.email;
    this.cuerpo["tipoPersona"] = paciente.tipoPersona;
    this.cuerpo["telefono"] = paciente.telefono;


    console.log("cuerpo: ", this.cuerpo);
    this.cuerpo = JSON.stringify(paciente);
    console.log("cuerpo: ", this.cuerpo);
    console.log("producto: ", paciente);
    // console.log("form: ", form);
    return this.httpClient.post<Pacientes>(this.baseUrl, this.cuerpo, this.httpOptions);
  }

  editPaciente(paciente: Pacientes) {
    console.log("ediPaciente");
    // console.log(this.header);
    this.cuerpo["nombre"] = paciente.nombre;
    this.cuerpo["apellido"] = paciente.apellido;
    this.cuerpo["ruc"] = paciente.ruc;
    this.cuerpo["cedula"] = paciente.cedula;
    this.cuerpo["fechaNacimiento"] = paciente.fechaNacimiento;
    this.cuerpo["email"] = paciente.email;
    this.cuerpo["tipoPersona"] = paciente.tipoPersona;
    this.cuerpo["telefono"] = paciente.telefono;
    this.cuerpo["idPersona"] = paciente.idPersona;

    console.log("cuerpo1: ",this.cuerpo);
    console.log("user: ", this.header["usuario"]);
    this.cuerpo = JSON.stringify(paciente);
    console.log("cuerpo2: ", this.cuerpo);
    return this.httpClient.put(this.baseUrl, this.cuerpo, this.httpOptions);
  }

  deletePaciente(idPersona: number) {
    return this.httpClient.delete<Pacientes>(this.baseUrl + '/' + idPersona).pipe(map(data => data));
  }

}
