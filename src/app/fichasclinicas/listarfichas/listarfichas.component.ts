import { Component, OnInit, Inject } from '@angular/core';
import { FichasClinicasService } from '../services/fichasClinicas.services';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { ModalClientesComponent } from 'src/app/util/modal-clientes/modal-clientes.component';
import { ModalFisioterapeutasComponent } from 'src/app/util/modal-fisioterapeutas/modal-fisioterapeutas.component';

@Component({
  selector: 'app-listarfichas',
  templateUrl: './listarfichas.component.html',
  styleUrls: ['./listarfichas.component.css']
})
export class ListarfichasComponent implements OnInit {


  private fichasClinicas: any[];
  private fisioterapeutas: any[];
  private pacientes: any[];
  private categorias: any[];
  private tipoProductos: any[];
  private showSpinner = false;

  private parametros_busqueda = { 'idFisioterapeuta': null, 'idPaciente': null, "fechadesde" : null , "fechahasta" : null , "idTipoProducto" : null }

  constructor(
    //Dependency injection
    private fichasClinicasService: FichasClinicasService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.cargarListaFichasClinicas();
    this.cargarComboBoxFisioterapeutas();
    this.cargarComboBoxPacientes();
    this.cargarComboBoxCategorias();

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


    }else if(nombre =="fechadesde"){
      console.log("se cambio fechadesde")
      this.parametros_busqueda["fechadesde"] = (new Date(dato)).toISOString().slice(0, 10).replace(/-/g, "");;



    }else if(nombre =="fechahasta"){
      console.log("se cambio fechahasta");
      this.parametros_busqueda["fechahasta"] = (new Date(dato)).toISOString().slice(0, 10).replace(/-/g, "");;



    }
  }

  public getFichasPorPaciente(idPaciente) {
    this.showSpinner = true;
    this.fichasClinicasService.getFichasPorPaciente(idPaciente).subscribe((response: any) => {
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
    this.fichasClinicasService.getFichasPorFisioterapeuta(idFisioterapeuta).subscribe((response: any) => {
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

    this.fichasClinicasService.getFichasPorTipoDeProducto(idTipoProducto).subscribe((response: any) => {
      this.fichasClinicas = response.lista;
      console.log('C', this.fichasClinicas)

    }, error => {
      console.log('Error', error.message)
    }).add(() => {
      this.showSpinner = false;
    })
  }

  public cargarComboBoxFisioterapeutas() {
    this.fichasClinicasService.getFisioterapeutas().subscribe((response: any) => {
      this.fisioterapeutas = response
    }, error => {
      console.log('Error : ', error.message)
    })
  }

  public cargarComboBoxTipoDeProductos(idCategoria) {
    this.fichasClinicasService.getTipoProducto(idCategoria).subscribe((response: any) => {
      this.tipoProductos = response.lista;
      console.log('Los productos', this.tipoProductos)

    }, error => {
      console.log('Error ', error.message)
    })
  }

  public cargarComboBoxCategorias() {
    this.fichasClinicasService.getCategorias().subscribe((response) => {
      this.categorias = response.lista;
      console.log('Categorias ', this.categorias)
    }, error => {
      console.log('Error ', error.message)
    })
  }
  public cargarListaFichasClinicas() {
    this.showSpinner = true;
    this.fichasClinicasService.getFichasClinicas().subscribe((response: any) => {
      this.fichasClinicas = response.lista;
      console.log("CargarListaFichasClinicas ", this.fichasClinicas);

    }, (error: any) => {
      console.log('Error : ', error.message)
    }).add(() => {
      this.showSpinner = false
    });
  }

  public cargarComboBoxPacientes() {
    this.fichasClinicasService.getPacientes().subscribe((response: any) => {
      this.pacientes = response;
    }, (error: any) => {
      console.log('Error : ', error.message)
    })

  }

  irAfichaComponent() {
    console.log('->')
    this.router.navigate(['./../agregar-nueva-ficha-clinica', "null", "null"], { relativeTo: this.route });

  }

  abrirPopup(idFicha, observacion) {
    console.log(idFicha + " " + observacion);
    //le pasamos la clase del componente y los datos 

    let dialogRef = this.dialog.open(DialogFichasClinicas, {
      data: {
        idFicha: idFicha,
        observacion: observacion,
        route : this.route,
        router : this.router
      },
    }).afterClosed().subscribe((response) => {
      //y si reinicializamos
      if (response == "modificado") {
        this.ngOnInit();

      }

    })

  }

  irAcrearServicio(idEmpleado, idPaciente) {
    console.log(idEmpleado + " " + idPaciente);
    this.router.navigate(['./../../servicios/crear-modificar-servicios/accion/', "crear", idEmpleado, idPaciente, "null"], { relativeTo: this.route });
  }

  public filtrarResultados(){
    this.fichasClinicasService.filtrar(this.parametros_busqueda).subscribe((response : any)=>{
        this.fichasClinicas = response.lista
        console.log("FICHAS FILTRADAS", this.fichasClinicas);

    },error =>{
        console.log("error" ,error.message);
    })


  }

  public limpiar(){
    this.parametros_busqueda = { 'idFisioterapeuta': null, 'idPaciente': null, "fechadesde" : null , "fechahasta" : null , "idTipoProducto" : null };
    this.cargarListaFichasClinicas();


  }

  




}

//EL COMPONENTE DEL DIALOG
//SE TIENE QUE AGREGAR EN APP MODULE DECLARATIONS Y ENTRYPOINT
@Component({
  selector: 'dialog-fichas-clinicas',
  //se incluye el html dentro del component
  template:
    `
  <h2 mat-dialog-title>
  <span>
  Modificacion de Ficha Clinica
  </span>
  </h2>

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
                >
    </mat-form-field>

    <div class="row">
      <div class="col-md-12" *ngIf="!showSpinnerpopup">
        <div class="card">
          <div class="card-header card-header-icon card-header-rose">
            <div class="card-icon">
              <i class="material-icons">assignment</i>
            </div>
            <h4 class="card-title ">Listado de Servicios  Asociados a la ficha</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead class="text-primary">
                  <tr>
                    <th>Fecha</th>
                    <th>Presupuesto</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let servicio of servicios">
                    <td>{{servicio.fechaHora}}</td>
                    <td>{{servicio.presupuesto}}</td>
                    <td><button mat-raised-button type="button" class="btn btn-info" (click)="irAverEditarFicha(data.idFicha)">
                      Ver/Editar Servicio Asociado<i class="material-icons">edit</i>
                    </button></td>
       


                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>


      </div>
      <div class="col-md-12" *ngIf="showspinnerpopup" style="text-align: center">
        <mat-spinner [style.display]="showspinerpopup ? 'block' : 'none'" style="margin:0 auto;"  mode="indeterminate"></mat-spinner>
      </div>
    </div>




 
</mat-dialog-content>

<mat-dialog-actions>
    <button  class="mat-raised-button"(click)="save()">Modificar</button>
    <button  class="mat-raised-button"(click)="close()">Cancelar</button>
</mat-dialog-actions>
`

})



export class DialogFichasClinicas implements OnInit {



  public servicios: any[];
  public showspinnerpopup = false;


  constructor(
    public dialogRef: MatDialogRef<DialogFichasClinicas>, private _snackBar: MatSnackBar, private fichasService: FichasClinicasService,
    private router: Router,
    private route: ActivatedRoute,
    //any -> asi podemos enviar un objeto cualquiero con cualquier propiedad
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.showspinnerpopup=true;
    this.fichasService.getServiciosApartirDeFicha(this.data.idFicha).subscribe((response: any) => {
      this.servicios = response.lista;
      console.log("Servicios", this.servicios);

    }, error => {
      this.openSnackBar(error.message, "Error");
      console.log("Error");

    }).add(()=>{
        this.showspinnerpopup = false;

    })

  }

  save() {
    let objeto = { "idFichaClinica": this.data.idFicha, "observacion": this.data.observacion };
    this.fichasService.modificarFichaClinica(objeto).subscribe((response: any) => {


      this.openSnackBar("Ficha Clinica modificada con exito!", "aviso");
      this.dialogRef.close("modificado");



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

  irAverEditarFicha(idFicha){
    this.data.router.navigate(['./../../servicios/crear-modificar-servicios/accion',"modificar","null","null",idFicha], { relativeTo: this.data.route });
    this.dialogRef.close("redireccionado")

  }


}


