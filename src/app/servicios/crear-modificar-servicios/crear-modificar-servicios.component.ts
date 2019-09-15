import { Component, OnInit, Inject } from '@angular/core';
import { ServiciosService } from '../services/servicios.services';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogFichasClinicas } from 'src/app/fichasclinicas/listarfichas/listarfichas.component';

@Component({
  selector: 'app-crear-modificar-servicios',
  templateUrl: './crear-modificar-servicios.component.html',
  styleUrls: ['./crear-modificar-servicios.component.css']
})
export class CrearModificarServiciosComponent implements OnInit {

  private showSpinner = null;
  private fisioterapeutas: any[];
  private pacientes: any[];
  public reservas: any[];
  public fichas: any[];
  private accion = null;
  private idFicha = null

  //inicializar en null 
  private parametros_busqueda = { 'idFisioterapeuta': null, 'idPaciente': null, 'fechadesde': null, 'fechahasta': null }

  constructor(
    //Dependency injection
    private serviciosServices: ServiciosService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.fisioterapeutas = [];
    this.pacientes = [];
    this.fichas = [];
    this.accion = null;
    this.idFicha = null

    this.parametros_busqueda = { 'idFisioterapeuta': null, 'idPaciente': null, 'fechadesde': null, 'fechahasta': null };

    if (this.route.snapshot.paramMap.get("accion") == "crear") {
      //se recibio por la url el valor agregar
      console.log("hola");
      this.parametros_busqueda["idFisioterapeuta"] = parseInt(this.route.snapshot.paramMap.get("idEmpleado"));
      this.parametros_busqueda["idPaciente"] = parseInt(this.route.snapshot.paramMap.get("idPaciente"));
      this.cargarListaFichas();

    } else if (this.route.snapshot.paramMap.get("accion") == "modificar") {
      this.accion = "modificar";
      this.idFicha = parseInt(this.route.snapshot.paramMap.get("idFichaClinica"));
      console.log("idFicha", this.idFicha)
      this.cargarListaFichas1();


    }
    this.cargarComboBoxFisioterapeutas();
    this.cargarComboBoxPacientes();


  }

  public cargarListaFichas1() {
    this.showSpinner = true;
    var fechaActual = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    console.log("Fecha actual", fechaActual);
    this.serviciosServices.getFichas().subscribe((response: any) => {
      this.fichas = response.lista;
      console.log("Los parametros en cargar lista fichas son", this.parametros_busqueda);
      console.log("Las fichas son", this.fichas);


    }, (error: any) => {
      console.log("Error al obtener reservas", error.message);


    }).add(() => {

      this.showSpinner = false


    })

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


  public cargarListaFichas() {
    this.showSpinner = true;
    var fechaActual = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    console.log("Fecha actual", fechaActual);
    this.serviciosServices.getFichasClinicasFiltradoPorPacienteyFisioterapeuta(this.parametros_busqueda).subscribe((response: any) => {
      this.fichas = response.lista;
      console.log("Los parametros en cargar lista fichas son", this.parametros_busqueda);
      console.log("Las fichas son", this.fichas);


    }, (error: any) => {
      console.log("Error al obtener reservas", error.message);


    }).add(() => {

      this.showSpinner = false


    })


  }
  public cargarComboBoxFisioterapeutas() {
    this.serviciosServices.getFisioterapeutas().subscribe((response: any) => {
      this.fisioterapeutas = response
    }, error => {
      console.log('Error : ', error.message)
    })
  }

  public cargarComboBoxPacientes() {
    this.serviciosServices.getPacientes().subscribe((response: any) => {
      this.pacientes = response;
      console.log('Los pacientes', this.pacientes)

    }, error => {
      console.log('Error ', error.message)
    })
  }


  public mostrarcrearficha(idFicha, observacion) {
    let dialogRef = this.dialog.open(DialogCrearCabeceraServicio, {
      data: {
        idFicha: idFicha,
        observacion: observacion,
      },
    }).afterClosed().subscribe((r) => {
      let dialogRef = this.dialog.open(DialogCrearDetalleAsociado, {


      }).afterClosed().subscribe((a) => {
        if (a == "si") {
          this.router.navigate(['./../../../../../../detalles/listar-detalles-asociados', r], { relativeTo: this.route });


        }


      })



    })


  }

  

  




}


//EL COMPONENTE DEL DIALOG
//SE TIENE QUE AGREGAR EN APP MODULE DECLARATIONS Y ENTRYPOINT
@Component({
  selector: 'dialog-crear-cabecera-servicios',
  //se incluye el html dentro del component
  template:
    `
  <h2 mat-dialog-title>
  <span>
  Creacion de la Cabecera de Servicio
  
  </span>
  </h2>
  <h4>
  <p>

        Estos son los datos con los que se creara la cabecera de servicio
  </p>
      </h4>
<mat-dialog-content>
  
    <mat-form-field>
        <input matInput 
                placeholder="El Identificador de la ficha"
                [(ngModel)]="data.idFicha"      
                disabled>
    </mat-form-field>

    <mat-form-field>
        <input matInput 
                placeholder="La observacion de la ficha es"
                [(ngModel)]="data.observacion"      
                disabled>
    </mat-form-field>

    


 
</mat-dialog-content>

<mat-dialog-actions>
    <button  class="mat-raised-button"(click)="save()">Crear Cabecera</button>
    <button  class="mat-raised-button"(click)="close()">Cancelar</button>
</mat-dialog-actions>
`

})



export class DialogCrearCabeceraServicio implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogFichasClinicas>, private _snackBar: MatSnackBar, private serviciosServices: ServiciosService,
    //any -> asi podemos enviar un objeto cualquiero con cualquier propiedad
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

  }

  save() {
    let objeto = { "idFichaClinica": { "idFichaClinica": this.data.idFicha }, "observacion": this.data.observacion };
    this.serviciosServices.crearCabeceraServicios(objeto).subscribe((response: any) => {


      this.openSnackBar("Cabecera Servicio Creada", "Aviso!");
      //pasamos el id de servicio generado
      this.dialogRef.close(response);
      console.log("El id del servicio generado es ", response)



    }, (error: any) => {


      this.openSnackBar(error.message, "Error");
      this.dialogRef.close("error");




    })




  }

  eliminar() {


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


//EL COMPONENTE DEL DIALOG
//SE TIENE QUE AGREGAR EN APP MODULE DECLARATIONS Y ENTRYPOINT
@Component({
  selector: 'dialog-crear-detalle-asociado',
  //se incluye el html dentro del component
  template:
    `
  <h2 mat-dialog-title>
  <span>
        Crear Detalle Asociado a la cabecera
  </span>
  </h2>
 
<mat-dialog-content>
  
    
<h4>
  <p>
  Bueno,... Ahora tenes  que crear un detalle asociado a la cabecera
  </p>
  <p>
  Tambien, podes hacerlo en la parte de listado de servicios y hacer click
  en crear detalle asociado!.
  </p>
</h4>

 
</mat-dialog-content>

<mat-dialog-actions>
    <button  class="mat-raised-button"(click)="save()">Crear Detalle Ahora</button>
    <button  class="mat-raised-button"(click)="close()">Ahora no</button>
</mat-dialog-actions>
`

})



export class DialogCrearDetalleAsociado implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogCrearDetalleAsociado>, private _snackBar: MatSnackBar, private serviciosServices: ServiciosService,
    //any -> asi podemos enviar un objeto cualquiero con cualquier propiedad
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

  }

  save() {

    console.log("Ahora redireccionando a crear detalle");
    this.dialogRef.close("si");




  }










  close() {
    this.dialogRef.close("no")
  }

}
