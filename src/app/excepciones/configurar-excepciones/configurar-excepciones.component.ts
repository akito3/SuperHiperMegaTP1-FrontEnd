import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ExcepcionesService } from 'src/app/services/excepciones.service';

@Component({
  selector: 'app-configurar-excepciones',
  templateUrl: './configurar-excepciones.component.html',
  styleUrls: ['./configurar-excepciones.component.css']
})
export class ConfigurarExcepcionesComponent implements OnInit {


  private showSpinner = null;
  private fisioterapeutas: any[];
  public reservas: any[];
  // inicializar en null 
  private parametros_busqueda = { 'idFisioterapeuta': null, 'fechadesde': null, 'fechahasta': null };

  constructor(
    // Dependency injection
    private excepcionService: ExcepcionesService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fisioterapeutas = [];
    this.reservas = [];
    this.parametros_busqueda = { 'idFisioterapeuta': null, 'fechadesde': null, 'fechahasta': null };
    this.cargarListaReservas();
    this.cargarComboBoxFisioterapeutas();
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


  public cargarListaReservas() {
    this.showSpinner = true;
    this.excepcionService.getExcepciones().subscribe((response: any) => {
      this.reservas = response.lista;
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

  public irAagregarReservaComponent() {

    this.router.navigate(['../agregar-reservas'], { relativeTo: this.route });



  }
 

  irAcrearFicha(idEmpleado, idCliente){
    this.router.navigate(['./../../fichas-clinicas/agregar-nueva-ficha-clinica', idEmpleado, idCliente], {relativeTo : this.route});
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
