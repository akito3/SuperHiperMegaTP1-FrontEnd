import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservasServices } from '../services/reservas.services';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  private fisioterapeutas: any[];
  private pacientes: any[];
  public reservas: any[];
  //inicializar en null 
  private parametros_busqueda = { 'idFisioterapeuta': null, 'idPaciente': null, 'fechadesde': null, 'fechahasta': null }

  constructor(
    //Dependency injection
    private reservasService: ReservasServices,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.cargarListaReservas();
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
    } else if (nombre == "fechadesde") {
      console.log("Se cambio el fechadesde");
      //Obtenemos el valor obtenidos del datepicker y lo convertimos a formato YYYYMMDD
      this.parametros_busqueda["fechadesde"] = (new Date(dato)).toISOString().slice(0, 10).replace(/-/g, "");
      console.log(this.parametros_busqueda)
    } else if (nombre == "fechahasta") {
      console.log("se cambio el fechahasta");
      //Obtenemos el valor obtenidos del datepicker y lo convertimos a formato YYYYMMDD
      this.parametros_busqueda["fechahasta"] = (new Date(dato)).toISOString().slice(0, 10).replace(/-/g, "");
      console.log(this.parametros_busqueda)


    }
  }


  public cargarListaReservas() {
    var fechaActual = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    console.log("Fecha actual", fechaActual);
    this.reservasService.getReservas(fechaActual).subscribe((response: any) => {
      this.reservas = response.lista;
      console.log("Las reservas son", this.reservas);


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

  public filtrarReservas() {
    this.reservasService.getReservasFiltradas(this.parametros_busqueda).subscribe((response: any) => {
      this.reservas = response.lista;
    }, error => {
      console.log("Error al filtrar ", error.message)


    })


  }

  public irAagregarReservaComponent(){

    this.router.navigate(['../agregar-reservas'],{relativeTo : this.route});



  }




}
