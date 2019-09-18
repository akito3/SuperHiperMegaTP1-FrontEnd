import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../services/servicios.services';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalClientesComponent } from '../../util/modal-clientes/modal-clientes.component';
import { ModalFisioterapeutasComponent } from 'src/app/util/modal-fisioterapeutas/modal-fisioterapeutas.component';
@Component({
  selector: 'app-listar-servicios',
  templateUrl: './listar-servicios.component.html',
  styleUrls: ['./listar-servicios.component.css']
})
export class ListarServiciosComponent implements OnInit {

  private fichasClinicas: any[];
  private fisioterapeutas: any[];
  private pacientes: any[];
  private categorias: any[];
  private tipoProductos: any[];
  private showSpinner = false;
  private servicios: any[];
  private parametros_busqueda = { 'idFisioterapeuta': null, 'idPaciente': null, 'fechadesde': null, 'fechahasta': null };

  constructor(
    private serviciosService: ServiciosService, private router: Router,
    private route: ActivatedRoute, private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.cargarListaServicio();
    this.cargarComboBoxFisioterapeutas();
    this.cargarComboBoxPacientes();
    this.cargarComboBoxCategorias();

  }

  public onChange(dato, nombre) {
    if (nombre == "idFisioterapeuta") {
      this.parametros_busqueda["idFisioterapeuta"] = dato;
      console.log(this.parametros_busqueda)
      //this.getFichasPorFisioterapeuta(this.parametros_busqueda["idFisioterapeuta"])

    } else if (nombre == "idPaciente") {
      console.log('paciente')
      this.parametros_busqueda["idPaciente"] = dato;
      console.log(this.parametros_busqueda);
      //this.getFichasPorPaciente(this.parametros_busqueda["idPaciente"])



    } else if (nombre == "idCategoria") {
      this.parametros_busqueda["idCategoria"] = dato;
      this.cargarComboBoxTipoDeProductos(this.parametros_busqueda['idCategoria'])
      console.log(this.parametros_busqueda)
    } else if (nombre == "idTipoProducto") {
      this.parametros_busqueda["idTipoProducto"] = dato;
      console.log(this.parametros_busqueda)
      //this.getFichasPorTipoProducto(this.parametros_busqueda["idTipoProducto"])


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

  public getFichasPorPaciente(idPaciente) {
    this.showSpinner = true;
    this.serviciosService.getFichasPorPaciente(idPaciente).subscribe((response: any) => {
      this.fichasClinicas = response.lista;
      console.log('A', this.fichasClinicas)

    }, error => {
      console.log('Error', error.message)
    }).add(() => {
      this.showSpinner = false;
    })
  }

  public getFichasPorFisioterapeuta(idFisioterapeuta) {
    this.showSpinner = true;
    this.serviciosService.getFichasPorFisioterapeuta(idFisioterapeuta).subscribe((response: any) => {
      this.fichasClinicas = response.lista;
      console.log('B', this.fichasClinicas)

    }, error => {
      console.log('Error', error.message)
    }).add(() => {
      this.showSpinner = false;
    })
  }

  public getFichasPorTipoProducto(idTipoProducto) {
    this.showSpinner = true;

    this.serviciosService.getFichasPorTipoDeProducto(idTipoProducto).subscribe((response: any) => {
      this.fichasClinicas = response.lista;
      console.log('C', this.fichasClinicas)

    }, error => {
      console.log('Error', error.message)
    }).add(() => {

      this.showSpinner = false;


    })
  }

  public cargarComboBoxFisioterapeutas() {
    this.serviciosService.getFisioterapeutas().subscribe((response: any) => {
      this.fisioterapeutas = response
    }, error => {
      console.log('Error : ', error.message)
    })
  }

  public cargarComboBoxTipoDeProductos(idCategoria) {
    this.serviciosService.getTipoProducto(idCategoria).subscribe((response: any) => {
      this.tipoProductos = response.lista;
      console.log('Los productos', this.tipoProductos)

    }, error => {
      console.log('Error ', error.message)
    })
  }

  public cargarComboBoxCategorias() {
    this.serviciosService.getCategorias().subscribe((response) => {
      this.categorias = response.lista;
      console.log('Categorias ', this.categorias)
    }, error => {
      console.log('Error ', error.message)
    })
  }
  public cargarListaServicio() {
    this.showSpinner = true;
    this.serviciosService.getServicios().subscribe((response: any) => {
      this.servicios = response.lista;
      console.log("cargar lista servicios ", this.servicios);

    }, (error: any) => {
      console.log('Error : ', error.message)
    }).add(() => {
      this.showSpinner = false
    });
  }

  public cargarComboBoxPacientes() {
    this.serviciosService.getPacientes().subscribe((response: any) => {
      this.pacientes = response;
    }, (error: any) => {
      console.log('Error : ', error.message)
    })

  }

  irAfichaComponent() {
    console.log('->')
    //  this.router.navigate(['./../agregar-nueva-ficha-clinica', "null", "null"], { relativeTo: this.route });

  }
  filtrarServicios() {
    console.log("Filtrando")
    this.serviciosService.getServiciosFiltrado(this.parametros_busqueda).subscribe((response: any) => {
      console.log("Response", response.lista);
      this.servicios = response.lista


    }, (error: any) => {
      console.log("Error", error.message);



    })

  }

  public abrirModalClientes(){
    this.dialog.open(ModalClientesComponent, {
      data: {
          clientes : this.pacientes
      }
    }).afterClosed().subscribe((a) => {
          this.parametros_busqueda["idPaciente"]=parseInt(a);
          console.log(this.parametros_busqueda);

    })



  }

  public abrirModalFisioterapeutas(){
    this.dialog.open(ModalFisioterapeutasComponent, {
      data: {
          fisioterapeutas : this.fisioterapeutas
      }
    }).afterClosed().subscribe((a) => {
          this.parametros_busqueda["idFisioterapeuta"]=parseInt(a);
          console.log(this.parametros_busqueda);

    })



  }

  irAcrearServicio() {

    this.router.navigate(['./../crear-modificar-servicios/accion', "agregar"], { relativeTo: this.route });

  }

  limpiar() {
    this.parametros_busqueda = { 'idFisioterapeuta': null, 'idPaciente': null, 'fechadesde': null, 'fechahasta': null };
    this.ngOnInit();

  }

  irAmodificarServicio(idFichaClinica) {

    this.router.navigate(['./../crear-modificar-servicios/accion', "modificar", "null", "null", idFichaClinica], { relativeTo: this.route });

  }



}
