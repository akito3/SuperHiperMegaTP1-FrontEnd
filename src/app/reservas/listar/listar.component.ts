import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservasServices } from '../services/reservas.services';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {


  private showSpinner = null;
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
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fisioterapeutas = [];
    this.pacientes = [];
    this.reservas = [];
    this.parametros_busqueda = { 'idFisioterapeuta': null, 'idPaciente': null, 'fechadesde': null, 'fechahasta': null };
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
    this.showSpinner = true;
    var fechaActual = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    console.log("Fecha actual", fechaActual);
    this.reservasService.getReservas(fechaActual).subscribe((response: any) => {
      this.reservas = response.lista;
      console.log("Las reservas son", this.reservas);


    }, (error: any) => {
      console.log("Error al obtener reservas", error.message);


    }).add(()=>{

        this.showSpinner = false


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
    this.showSpinner = true;

    this.reservasService.getReservasFiltradas(this.parametros_busqueda).subscribe((response: any) => {
      this.reservas = response.lista;
    }, error => {
      console.log("Error al filtrar ", error.message)


    }).add(()=>{

        this.showSpinner = false


    })


  }

  limpiar(){

   //reiniciamos la pagina
   this.ngOnInit(); 



  }

  public irAagregarReservaComponent() {

    this.router.navigate(['../agregar-reservas'], { relativeTo: this.route });



  }
  abrirPopup(idReserva, observacion, flagAsistio) {
    console.log(idReserva + " " + observacion + flagAsistio);
    //le pasamos la clase del componente y los datos 
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        idReserva: idReserva,
        observacion: observacion,
        flagAsistio: flagAsistio,
        accion: "modificacion"
      },
    }).afterClosed().subscribe((response) => {
      //y si reinicializamos
      if (response == "modificado" || response == "eliminado") {
        this.ngOnInit();

      }
    })

  }
  abrirPopupEliminacion(idReserva, observacion, flagAsistio) {
    console.log(idReserva + " " + observacion + flagAsistio);
    //le pasamos la clase del componente y los datos 
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        idReserva: idReserva,
        observacion: observacion,
        flagAsistio: flagAsistio,
        accion: "eliminacion"
      },
    }).afterClosed().subscribe((response) => {
      //y si reinicializamos
      if (response == "modificado" || response == "eliminado") {
        this.ngOnInit();

      }
    })

  }


  irAcrearFicha(idEmpleado,idCliente){
    this.router.navigate(['./../../fichas-clinicas/agregar-nueva-ficha-clinica',idEmpleado,idCliente],{relativeTo : this.route});
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
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private _snackBar: MatSnackBar, private reservasService: ReservasServices,
    //any -> asi podemos enviar un objeto cualquiero con cualquier propiedad
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

  }

  save() {
    let objeto = {
      "idReserva": this.data.idReserva,
      "observacion": this.data.observacion,
      "flagAsistio": this.data.flagAsistio
    }
    this.reservasService.modificarReserva(objeto).subscribe((response: any) => {
      this.openSnackBar("Reserva modificada con exito", "Aviso")
      this.dialogRef.close("modificado");


    }, (error: any) => {
      this.openSnackBar(error.message, "Aviso")
      this.dialogRef.close("error");




    })
  }

  eliminar() {
    this.reservasService.eliminarReserva(this.data.idReserva).subscribe((response: any) => {
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
