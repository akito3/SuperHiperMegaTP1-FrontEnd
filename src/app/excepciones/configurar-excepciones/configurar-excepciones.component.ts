import { Component, OnInit, Inject, SystemJsNgModuleLoader } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ExcepcionesService } from 'src/app/services/excepciones.service';
import { ModalFisioterapeutasComponent } from 'src/app/util/modal-fisioterapeutas/modal-fisioterapeutas.component';

declare const $: any;
@Component({
  selector: 'app-configurar-excepciones',
  templateUrl: './configurar-excepciones.component.html',
  styleUrls: ['./configurar-excepciones.component.css']
})
export class ConfigurarExcepcionesComponent implements OnInit {


  private showSpinner = null;
  private fisioterapeutas: any[];
  public reservas: any[];
  public inicio = 0;
  public cantidad = 10;
  private orderBy = 'idHorarioExcepcion';
  private orderDir = 'asc';
  count: Number = 0;
  totalExcepciones: Number = 0;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  private pagination = {
    inicio: 0,
    cantidad: 10,
  };
  // inicializar en null 
  private parametros_busqueda = { 'idFisioterapeuta': null, 'fechadesde': null, 'fechahasta': null, 'cantidad':null, 'orderBy':null, 'orderDir':null };

  constructor(
    // Dependency injection
    private excepcionService: ExcepcionesService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }
  private objetoAgregar : any = {
    fechaCadena: null,
    horaAperturaCadena: null,
    horaCierreCadena: null,
    flagEsHabilitar: null,
    idEmpleado: {
      idPersona: null
    },
    intervaloMinutos: null,
  };
  private objetoEditar: any = {
    idHorarioExcepcion: null,
    fechaCadena: null,
    horaApertura: null,
    horaCierre: null,
    flagEsHabilitar: null,
    idEmpleado: {
      idPersona: null
    },
    intervaloMinutos: null,
  };
  private objetoEliminar: any = {
    idHorarioExcepcion: null,
    fechaCadena: null,
    horaApertura: null,
    horaCierre: null,
    flagEsHabilitar: null,
    idEmpleado: {
      idPersona: null
    },
    intervaloMinutos: null,
  };
  ngOnInit() {
    this.fisioterapeutas = [];
    this.reservas = [];
    this.parametros_busqueda = { 'idFisioterapeuta': null, 'fechadesde': null, 'fechahasta': null, 'cantidad':null, 'orderBy':null, 'orderDir':null};
    this.cargarListaReservas();
    this.cargarComboBoxFisioterapeutas();
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

  public onChange(dato, nombre) {
    if (nombre === 'idFisioterapeuta') {
      this.parametros_busqueda['idFisioterapeuta'] = dato;
      console.log(this.parametros_busqueda);
    } else if (nombre === 'fechadesde') {
      console.log('Se cambio el fechadesde');
      // Obtenemos el valor obtenidos del datepicker y lo convertimos a formato YYYYMMDD
      this.parametros_busqueda['fechadesde'] = (new Date(dato)).toISOString().slice(0, 10).replace(/-/g, '');
      console.log(this.parametros_busqueda);
    } else if (nombre === 'fechahasta') {
      console.log('se cambio el fechahasta');
      // Obtenemos el valor obtenidos del datepicker y lo convertimos a formato YYYYMMDD
      this.parametros_busqueda['fechahasta'] = (new Date(dato)).toISOString().slice(0, 10).replace(/-/g, '');
      console.log(this.parametros_busqueda);
    }
  }

  get_page(event) {
    this.cantidad = event.pageSize;
    this.inicio = event.pageSize * event.pageIndex;
    this.cargarListaReservas();
  }

 /* get_page(event) {
    console.log('Entro a get_page');
    this.pagination.cantidad = event.pageSize;
    this.pagination.inicio = event.pageSize * event.pageIndex;
    this.cargarListaReservas();
  }*/


  public cargarListaReservas() {
    console.log('Entro a cargarListaReservas');
    this.showSpinner = true;
    this.excepcionService.getExcepciones().subscribe((response: any) => {
      this.reservas = response.lista;
      this.count = response.totalDatos;
      this.totalExcepciones = response['totalDatos']
      console.log('count ' + this.count);
      console.log('Las reservas son', this.reservas);
    }, (error: any) => {
      console.log('Error al obtener reservas', error.message);

    }).add(() => {
        this.showSpinner = false;
    });


  }
  public cargarComboBoxFisioterapeutas() {
    this.excepcionService.getFisioterapeutas().subscribe((response: any) => {
      this.fisioterapeutas = response;
    }, error => {
      console.log('Error : ', error.message);
    });
  }

  public filtrarReservas() {
    this.showSpinner = true;
    this.excepcionService.getReservasFiltradas(this.parametros_busqueda).subscribe((response: any) => {
      this.reservas = response.lista;
    }, error => {
      console.log('Error al filtrar ', error.message);


    }).add(() => {

        this.showSpinner = false;


    });


  }

  //public irAagregarExcepcionComponent() {
    //this.router.navigate(['../../agregar-excepciones'], { relativeTo: this.route });
  //}
 
  public irAagregarExcepcionComponent() {
    this.router.navigate(['dashboard/excepciones/crear']);
   }

   fechaCadena(date): String {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    console.log(year, month, day);
    let mString: String;
    let dString: String;
    if (month < 10) {mString = '0' + month.toString();}
    else {mString = month.toString();}
    if (day < 10) {dString = '0' + day.toString();} 
    else {
    dString = day.toString();}
    const dataText = year + mString + dString;
    return dataText;
  }
  irAcrearFicha(idEmpleado, idCliente){
    this.router.navigate(['./../../fichas-clinicas/agregar-nueva-ficha-clinica', idEmpleado, idCliente], {relativeTo : this.route});
  }

  editar(to_edit) {
    this.objetoEditar = JSON.parse(JSON.stringify(to_edit));
    $('#editModal').modal('show');
  }

  closeEdit(send) {
    if (send) {
      this.objetoEditar.fechaCadena = this.fechaCadena(this.objetoEditar.fechaCadena);
      if (this.objetoEditar.flagEsHabilitar === 'S' &&
        this.objetoEditar.horaAperturaCadena !== null &&
        this.objetoEditar.horaCierreCadena !== null) {
        let horas = this.objetoEditar.horaAperturaCadena.toString().substring(0, 2);
        let minutos = this.objetoEditar.horaAperturaCadena.toString().substring(3, 5);
        this.objetoEditar.horaAperturaCadena = horas + minutos;
        horas = this.objetoEditar.horaCierreCadena.toString().substring(0, 2);
        minutos = this.objetoEditar.horaCierreCadena.toString().substring(3, 5);
        this.objetoEditar.horaCierreCadena = horas + minutos;
      }
      this.objetoEditar.horaApertura = null;
      this.objetoEditar.horaCierre = null;
      this.objetoEditar.fecha = null;
      this.objetoEditar.idLocal = null;
      const idP = this.objetoEditar.idEmpleado.idPersona;
      this.objetoEditar.idEmpleado = {
        idPersona: idP,
      }
      this.excepcionService.modificarExcepcion(this.objetoEditar).subscribe(() => {
        this.cargarListaReservas();
      });
    }
    this.objetoEditar = {
      idHorarioExcepcion: null,
      fechaCadena: null,
      horaAperturaCadena: null,
      horaCierreCadena: null,
      flagEsHabilitar: null,
      idEmpleado: {
        idPersona: null
      },
      intervaloMinutos: null,
    };
    $('#editModal').modal('hide');
  }

  eliminar(to_delete) {
    console.log("Entro en eliminar");
    this.objetoEliminar = JSON.parse(JSON.stringify(to_delete));
    console.log(this.objetoEliminar);
    $('#deleteModal').modal('show');
  }

  closeDelete(send) {
    if (send) {
      this.excepcionService.eliminarExcepcion(this.objetoEliminar['idHorarioExcepcion']).subscribe(() => {
        this.cargarListaReservas();
      });
    }
    this.objetoEliminar = {
      idHorarioExcepcion: null,
      fechaCadena: null,
      horaAperturaCadena: null,
      horaCierreCadena: null,
      flagEsHabilitar: null,
      idEmpleado: {
        idPersona: null
      },
      intervaloMinutos: null,
    };
    $('#deleteModal').modal('hide');
  }


  modalAgregarExcepcion(objeto) {
    if (objeto) {
      this.objetoAgregar.fechaCadena = this.fechaCadena(this.objetoAgregar.fechaCadena);
      if (this.objetoAgregar.flagEsHabilitar === 'S' &&
        this.objetoAgregar.horaAperturaCadena !== null &&
        this.objetoAgregar.horaCierreCadena !== null) {
        let horas = this.objetoAgregar.horaAperturaCadena.toString().substring(0, 2);
        let minutos = this.objetoAgregar.horaAperturaCadena.toString().substring(3, 5);
        this.objetoAgregar.horaAperturaCadena = horas + minutos;
        horas = this.objetoAgregar.horaCierreCadena.toString().substring(0, 2);
        minutos = this.objetoAgregar.horaCierreCadena.toString().substring(3, 5);
        this.objetoAgregar.horaCierreCadena = horas + minutos;
      }
      this.excepcionService.agregarExcepcion(this.objetoAgregar).subscribe(() => {
        this.cargarListaReservas();
      });
    }
    this.objetoAgregar = {idHorarioExcepcion: null,fechaCadena: null,horaAperturaCadena: null,horaCierreCadena: null,flagEsHabilitar: null,idEmpleado: {idPersona: null},intervaloMinutos: null,};
    $('#modalExcepcionAdd').modal('hide');
  }


}



//EL COMPONENTE DEL DIALOG
//SE TIENE QUE AGREGAR EN APP MODULE DECLARATIONS Y ENTRYPOINT
@Component({
  selector: 'dialog-overview-example-dialog',
  //se incluye el html dentro del component
  template:
    `
  <h2 mat-dialog-title>
  <span *ngIf="data.accion=='modificacion'">
  Modificacion de Reserva
  </span>
  <span *ngIf="data.accion=='eliminacion'">
  Eliminacion de Reserva
  </span>
  </h2>

<mat-dialog-content>
  
    <mat-form-field *ngIf="data.accion=='modificacion'">
        <input matInput 
                placeholder="El Identificador de la Reserva"
                [(ngModel)]="data.idReserva"
                disabled>
    </mat-form-field>

    <p *ngIf="data.accion=='eliminacion'">
      Estas seguro de querer eliminar esta reserva?
	</p>
    <mat-form-field *ngIf="data.accion=='modificacion'">
        <input matInput
                placeholder="Observacion"
                [(ngModel)]="data.observacion">
    </mat-form-field>

    <mat-form-field *ngIf="data.accion=='modificacion'">
        <input matInput
                placeholder="Flag Asistio"
                [(ngModel)]="data.flagAsistio">
    </mat-form-field>


 
</mat-dialog-content>

<mat-dialog-actions>
    <button  class="mat-raised-button"(click)="close()">Cancelar</button>
    <button *ngIf="data.accion=='modificacion'" class="mat-raised-button mat-primary"(click)="save()">Modificar</button>
    <button *ngIf="data.accion=='eliminacion'" class="mat-raised-button mat-primary"(click)="eliminar()">Eliminar</button>

</mat-dialog-actions>

  `

})

export class DialogOverviewExampleDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private _snackBar: MatSnackBar, private reservasService: ExcepcionesService,
    //any -> asi podemos enviar un objeto cualquiero con cualquier propiedad
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

  }

  save() {
    let objeto = {
      'idHorarioExcepcion': this.data.idHorarioExcepcion,
      'fechaCadena': this.data.fechaCadena,
      'horaAperturaCadena': this.data.horaAperturaCadena,
      'horaCierreCadena': this.data.horaCierreCadena,
      'flagEsHabilitar': this.data.flagEsHabilitar,
      'idEmpleado': {
        'idPersona': this.data.idPersona,
      },
      'intervaloMinutos': this.data.intervaloMinutos
    }
    this.reservasService.modificarExcepcion(objeto).subscribe((response: any) => {
      this.openSnackBar("Reserva modificada con exito", "Aviso")
      this.dialogRef.close("modificado");


    }, (error: any) => {
      this.openSnackBar(error.message, "Aviso")
      this.dialogRef.close("error");




    })
  }

  eliminar() {
    this.reservasService.eliminarExcepcion(this.data.idReserva).subscribe((response: any) => {
      this.openSnackBar("Reserva eliminada  con exito", "Aviso")
      this.dialogRef.close("eliminado");


    }, (error: any) => {
      this.openSnackBar(error.message, "Aviso")
      this.dialogRef.close("error");


    })

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  close() {
    this.dialogRef.close("cancelado")
  }

  


}