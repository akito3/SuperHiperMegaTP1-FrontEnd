import { Component, OnInit, ɵConsole } from '@angular/core';
import { ReservasServices } from '../services/reservas.services';
import { MatSnackBar } from '@angular/material';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-reservas',
  templateUrl: './agregar-reservas.component.html',
  styleUrls: ['./agregar-reservas.component.css']
})
export class AgregarReservasComponent implements OnInit {

  private fisioterapeutas: any[];
  private pacientes: any[];
  public agendas: any[];
  //inicializar en null 
  private parametros_busqueda = { 'idFisioterapeuta': null, 'idPaciente': null, 'fecha': null, "mostrarSoloLibres": false }
  public observacion: string = null;
  public objetoaserenviado = null;

  public defaultFisioterapeuta

  constructor(private reservasService: ReservasServices, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    console.log("LOS PARAMETROS" , this.parametros_busqueda);
    this.pacientes = [];
    this.agendas = [];
    this.fisioterapeutas = [];
    this.parametros_busqueda = { 'idFisioterapeuta': null, 'idPaciente': null, 'fecha': null, "mostrarSoloLibres": false };
    this.observacion = null;
    this.objetoaserenviado = null;
    this.cargarListaAgendas();
    this.cargarComboBoxFisioterapeutas();
    this.cargarComboBoxPacientes();


  }

  public onChange(dato, nombre) {

    if (nombre == "idFisioterapeuta") {
      this.parametros_busqueda["idFisioterapeuta"] = dato;
      console.log(this.parametros_busqueda)

    } else if (nombre == "idPaciente") {
      console.log('paciente')
      this.parametros_busqueda["idPaciente"] = dato;
      console.log(this.parametros_busqueda);
    } else if (nombre == "fecha") {
      console.log("Se cambio el fecha");
      //Obtenemos el valor obtenidos del datepicker y lo convertimos a formato YYYYMMDD
      this.parametros_busqueda["fecha"] = (new Date(dato)).toISOString().slice(0, 10).replace(/-/g, "");
      console.log(this.parametros_busqueda)



    } else if (nombre == "mostrarSoloLibres") {
      this.parametros_busqueda.mostrarSoloLibres = !this.parametros_busqueda.mostrarSoloLibres;
      console.log(this.parametros_busqueda)


    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  public cargarListaAgendas() {
    var fechaActual = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    console.log("Fecha actual", fechaActual);
    this.reservasService.getAgendas(this.parametros_busqueda).subscribe((response: any) => {
      this.agendas = response;
      console.log("Las agendas son", this.agendas);


    }, (error: any) => {
      console.log("Error al obtener reservas", error.message);


    })


  }
  public cargarComboBoxFisioterapeutas() {
    this.reservasService.getFisioterapeutas().subscribe((response: any) => {
      this.fisioterapeutas = response
    }, error => {
      console.log('Error : ', error.message)
    })
  }

  public cargarComboBoxPacientes() {
    this.reservasService.getPacientes().subscribe((response: any) => {
      this.pacientes = response;
      console.log('Los pacientes', this.pacientes)

    }, error => {
      console.log('Error ', error.message)
    })
  }

  public capturarDatos(horaInicioCadena, horaFinCadena, idEmpleado, fechaCadena, idPaciente) {
    console.log(horaFinCadena + " " + horaFinCadena + " " + idEmpleado + " " + fechaCadena + " " + idPaciente);
    console.log("La observacion es ", this.observacion);

    var objeto = {
      "fechaCadena": fechaCadena,
      "horaInicioCadena": horaInicioCadena,
      "horaFinCadena": horaFinCadena,
      "idEmpleado": {
        "idPersona": idEmpleado
      },
      "idCliente": {
        "idPersona": idPaciente
      },


    }
    this.objetoaserenviado = objeto;


  }

  public enviar() {
    this.objetoaserenviado["observacion"] = this.observacion;
    this.reservasService.agregarReserva(this.objetoaserenviado).subscribe((response: any) => {
      console.log("Exito", response)
      this.openSnackBar("Reserva insertada con exito", "Aviso")
      setTimeout(function(){
        this.ngOnInit()
      }.bind(this),2000);



    }, error => {
      console.log("Error ", error.message);
      this.openSnackBar(error.message, "Aviso")


    })
  }


}
