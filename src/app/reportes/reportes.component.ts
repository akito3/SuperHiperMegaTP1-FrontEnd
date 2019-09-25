import { Component, OnInit, ɵConsole } from '@angular/core';
import { ServiciosService } from '../servicios/services/servicios.services';
import { Router, ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  private fichasClinicas: any[];
  public detalles: any[];
  private fisioterapeutas: any[];
  private pacientes: any[];
  private categorias: any[];
  private tipoProductos: any[];
  private showSpinner = false;
  private serviciosDetallados: any[];
  private servicios: any[];
  private presentaciones: any[];
  private parametros_busqueda = { 'idFisioterapeuta': null, 'idPaciente': null, 'fechadesde': null, 'fechahasta': null, 'idpresentacionproducto': null, "mostrarConDetalles": false };
  name = 'Angular';


  public tabla_exportar_a_excel_detallado: any = [];
  public tabla_exportar_a_excel_sin_detallar: any = [];

  constructor(
    private serviciosService: ServiciosService, private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarListaServiciosSinDetallar();
    this.cargarComboBoxFisioterapeutas();
    this.cargarComboBoxPacientes();
    this.cargarComboBoxCategorias();
    this.cargarComboBoxPresentacionProducto();

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

    } else if (nombre == "mostrarConDetalles") {
      this.parametros_busqueda.mostrarConDetalles = !this.parametros_busqueda.mostrarConDetalles;
      if (this.parametros_busqueda.mostrarConDetalles) {
        this.cargarListaServicioDetallados();

      } else {
        this.cargarListaServiciosSinDetallar();
      }
      console.log(this.parametros_busqueda)
    } else if (nombre == "presentaciones") {
      this.parametros_busqueda["idpresentacionproducto"] = dato;
      console.log(this.parametros_busqueda)


    }
  }
pdfSinDetallar() {

  this.serviciosService.getServicios().subscribe((response: any) => {
    this.servicios = response.lista;
  // columnas labels
    const cols = ["Fecha","Flag Estado","Id Ficha","Fecha Ficha","Profesional",
    "Cliente","Categoria","Subcategoria","Observacion","Presupuesto"];
  // filas datos
    let rows: any = [];

    this.servicios.forEach((element) => {
      const obj = [element.fechaHora, element.flagEstado, element.idFichaClinica.idFichaClinica, element.idFichaClinica.fechaHora,
        element.idEmpleado.nombreCompleto, element.idFichaClinica.idCliente.nombreCompleto,
         element.idFichaClinica.idTipoProducto.idCategoria.descripcion, element.idFichaClinica.idTipoProducto.descripcion,
         element.observacion, element.presupuesto];
      rows.push(obj);
    });
    let pdf = new jsPDF('1', 'pt');
    pdf.autoTable(cols, rows);
    pdf.save('sinDetalle.pdf');

    console.log('cargar lista servicios sin detallar ', this.servicios);
    console.log('B', rows);

  }, (error: any) => {
    console.log('Error : ', error.message);
  }).add(() => {
    this.showSpinner = false;
  });
}
pdfDetallado() {

  this.serviciosService.getServiciosReportes().subscribe((response: any) => {
    this.serviciosDetallados = response.lista;
    var servicio = this.serviciosService;

    const cols = ["fecha","profesional","cliente","subCategoria(Descripcion)","presupuesto","cantidad",
    "nombrepresentacion","precioVenta","preciototal"];
    let rows: any = [];

    this.serviciosDetallados.forEach(function (element) {
      var const1;
      var const2;
      let idpresentacionproducto = element.idPresentacionProducto.idPresentacionProducto;
      servicio.getPrecio(idpresentacionproducto).subscribe(( response : any) => {
        element['precioVenta'] = response.lista[0].precioVenta;
        const1 = element['precioVenta'];
        const2 = parseInt( const1 ) * parseInt( element.cantidad );
      }, error => {
        console.log('Error', error.message);
      });
      const objeto = [element.idServicio.fechaHora, element.idServicio.idEmpleado.nombreCompleto,
        element.idServicio.idFichaClinica.idCliente.nombreCompleto, element.idServicio.idFichaClinica.idTipoProducto.descripcion,
        element.idServicio.presupuesto, const1, element.cantidad, const2, element.idPresentacionProducto.nombre];
      rows.push(objeto);
    });
    let pdf = new jsPDF('1', 'pt');
    pdf.autoTable(cols, rows);
    pdf.save('Detallado.pdf');
    console.log('B pdf', rows);
  }, error => {
    console.log('Error', error.message);
  }).add(() => {
    this.showSpinner = false;
  });
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

  public cargarListaServiciosSinDetallar() {
    this.showSpinner = true;
    this.serviciosService.getServicios().subscribe((response: any) => {
      this.servicios = response.lista;
      var b = this.tabla_exportar_a_excel_sin_detallar;

      this.servicios.forEach((element) => {
        var obj = {};

        obj["Fecha"] = element.fechaHora;
        obj["Flag Estado"] = element.flagEstado;
        obj["Id Ficha"] = element.idFichaClinica.idFichaClinica;
        obj["Fecha Ficha"] = element.idFichaClinica.fechaHora;
        obj["Profesional"] = element.idEmpleado.nombreCompleto;
        obj["Cliente"] = element.idFichaClinica.idCliente.nombreCompleto
        obj["Categoria"] = element.idFichaClinica.idTipoProducto.idCategoria.descripcion;
        obj["Subcategoria"] = element.idFichaClinica.idTipoProducto.descripcion
        obj["Observacion"] = element.observacion;
        obj["Presupuesto"] = element.presupuesto;
        b.push(obj);


      })
      console.log("cargar lista servicios sin detallar ", this.servicios);
      console.log("B", b);

    }, (error: any) => {
      console.log('Error : ', error.message)
    }).add(() => {
      this.showSpinner = false
    });
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
  public cargarListaServicioDetallados() {
    this.showSpinner = true;
    this.serviciosService.getServiciosReportes().subscribe((response: any) => {
      this.serviciosDetallados = response.lista;
      var servicio = this.serviciosService;
      console.log("cargar lista servicios detallados ", this.serviciosDetallados);
      //creo que asi se adjuntan los precios
      var a = this.tabla_exportar_a_excel_detallado;

      this.serviciosDetallados.forEach(function (element) {
        var objeto = {};
        objeto["fecha"] = element.idServicio.fechaHora;
        objeto["profesional"] = element.idServicio.idEmpleado.nombreCompleto;
        objeto["cliente"] = element.idServicio.idFichaClinica.idCliente.nombreCompleto;
        objeto["subCategoria(Descripcion)"] = element.idServicio.idFichaClinica.idTipoProducto.descripcion;
        objeto["presupuesto"] = element.idServicio.presupuesto;
        objeto["cantidad"] = element.cantidad;
        objeto["nombrepresentacion"] = element.idPresentacionProducto.nombre




        let idpresentacionproducto = element.idPresentacionProducto.idPresentacionProducto;
        servicio.getPrecio(idpresentacionproducto).subscribe((response: any) => {
          element["precioVenta"] = response.lista[0].precioVenta;
          objeto["precioVenta"] = element["precioVenta"];
          objeto["preciototal"] = parseInt(objeto["precioVenta"]) * parseInt(objeto["cantidad"]);
          console.log("objeto", objeto);
          //exportamos 



        }, error => {
          console.log("Error", error.message);

        })
        //PUSH
        a.push(objeto);


      })
    }, error => {
      console.log("Error", error.message);
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
    this.showSpinner = true;
    console.log("Filtrando")
    this.serviciosService.getServiciosFiltrado(this.parametros_busqueda).subscribe((response: any) => {
      console.log("Response", response.lista);
      this.servicios = response.lista


      var b = this.tabla_exportar_a_excel_sin_detallar = [];

      this.servicios.forEach((element) => {
        var obj = {};

        obj["Fecha"] = element.fechaHora;
        obj["Flag Estado"] = element.flagEstado;
        obj["Id Ficha"] = element.idFichaClinica.idFichaClinica;
        obj["Fecha Ficha"] = element.idFichaClinica.fechaHora;
        obj["Profesional"] = element.idEmpleado.nombreCompleto;
        obj["Cliente"] = element.idFichaClinica.idCliente.nombreCompleto
        obj["Categoria"] = element.idFichaClinica.idTipoProducto.idCategoria.descripcion;
        obj["Subcategoria"] = element.idFichaClinica.idTipoProducto.descripcion
        obj["Observacion"] = element.observacion;
        obj["Presupuesto"] = element.presupuesto;
        b.push(obj);


      })
      console.log("cargar lista servicios sin detallar ", this.servicios);
      console.log("B", b);

    }, (error: any) => {
      console.log('Error : ', error.message)
    }).add(() => {
      this.showSpinner = false
    });
  }



  irAcrearServicio() {

    this.router.navigate(['./../crear-modificar-servicios/accion', "agregar"], { relativeTo: this.route });

  }

  irAmodificarServicio(idFichaClinica) {

    this.router.navigate(['./../crear-modificar-servicios/accion', "modificar", "null", "null", idFichaClinica], { relativeTo: this.route });

  }

  public limpiar() {
    this.ngOnInit();
    this.parametros_busqueda = { 'idFisioterapeuta': null, 'idPaciente': null, 'fechadesde': null, 'fechahasta': null, 'idpresentacionproducto': null, "mostrarConDetalles": false };



  }

  public filtrarReportes() {
    this.showSpinner = true;
    this.serviciosService.filtrarReportes(this.parametros_busqueda).subscribe((response: any) => {
      this.serviciosDetallados = response.lista
      console.log("this servicios filtrados reportes", this.servicios);
      var servicio = this.serviciosService;
      console.log("cargar lista servicios detallados ", this.serviciosDetallados);
      //creo que asi se adjuntan los precios
      var a = this.tabla_exportar_a_excel_detallado = [];

      this.serviciosDetallados.forEach(function (element) {
        var objeto = {};
        objeto["fecha"] = element.idServicio.fechaHora;
        objeto["profesional"] = element.idServicio.idEmpleado.nombreCompleto;
        objeto["cliente"] = element.idServicio.idFichaClinica.idCliente.nombreCompleto;
        objeto["subCategoria(Descripcion)"] = element.idServicio.idFichaClinica.idTipoProducto.descripcion;
        objeto["presupuesto"] = element.idServicio.presupuesto;
        objeto["cantidad"] = element.cantidad;
        objeto["nombrepresentacion"] = element.idPresentacionProducto.nombre

        let idpresentacionproducto = element.idPresentacionProducto.idPresentacionProducto;
        servicio.getPrecio(idpresentacionproducto).subscribe((response: any) => {
          element["precioVenta"] = response.lista[0].precioVenta;
          objeto["precioVenta"] = element["precioVenta"];
          objeto["preciototal"] = parseInt(objeto["precioVenta"]) * parseInt(objeto["cantidad"]);
          console.log("objeto", objeto);
          //exportamos 



        }, error => {
          console.log("Error", error.message);

        })
        //PUSH
        a.push(objeto);


      })
    }, error => {
      console.log("Error", error.message);
    }).add(() => {
      this.showSpinner = false
    });
  }

  public importarAexcelSinDetallar() {
    const workBook = XLSX.utils.book_new(); // create a new blank book
    console.log("tabla a exportar detallado", this.tabla_exportar_a_excel_detallado);
    const workSheet = XLSX.utils.json_to_sheet(this.tabla_exportar_a_excel_sin_detallar);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'Reportes_sin_detallar.xlsx'); // initiate a file download in browser

  }
  public importarAexcelDetallado() {

    const workBook = XLSX.utils.book_new(); // create a new blank book
    console.log("tabla a exportar detallado", this.tabla_exportar_a_excel_detallado);
    const workSheet = XLSX.utils.json_to_sheet(this.tabla_exportar_a_excel_detallado);

    XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'reportes_detallados.xlsx'); // initiate a file download in browser
  }

  public cargarComboBoxPresentacionProducto() {
    this.serviciosService.getPresentacionesTotal().subscribe((response: any) => {
      this.presentaciones = response.lista;

    }, error => {
      console.log("Error", error.message)
    })
  }


}