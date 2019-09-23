import { Component, OnInit, Inject } from '@angular/core';
import { ComisionesServices } from '../services/comisiones.services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ModalFisioterapeutasComponent } from 'src/app/util/modal-fisioterapeutas/modal-fisioterapeutas.component';
import { timingSafeEqual } from 'crypto';
import { TouchSequence } from 'selenium-webdriver';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-listar-comisiones',
  templateUrl: './listar-comisiones.component.html',
  styleUrls: ['./listar-comisiones.component.css']
})
export class ListarComisionesComponent implements OnInit {

  private fichasClinicas: any[];
  private fisioterapeutas: any[];
  private pacientes: any[];
  private categorias: any[];
  private tipoProductos: any[];
  private presentacionProductos: any[];
  private comisiones: any[];

  private showSpinner = false;
  public precio = null;
  private parametros_busqueda = { "idFisioterapeuta": null, "idCategoria": null, "idTipoProducto": null, "idpresentacionproducto": null };
  public cantidad = 0;
  private detalles: any[];
  constructor(private comisionesServices: ComisionesServices,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    this.cargarComboBoxCategorias();
    this.cargarComboBoxFisioterapeutas();
    this.filtrar();
  }

  filtrar() {
    this.showSpinner = true;
    this.comisionesServices.getComisionesFiltrado(this.parametros_busqueda).subscribe((response: any) => {
      console.log('Las comisiones son', response);
      this.comisiones = response.lista;

    }, error => {



    }).add(() => {
      this.showSpinner = false;

    })

  }

  irAcrearNuevaComision() {
    this.router.navigate(["../crear-comisiones", "crear", "null", "null", "null", "null", "null", "null"], { relativeTo: this.route });
  }

  cargarComboBoxFisioterapeutas() {
    this.comisionesServices.getFisioterapeutas().subscribe((response: any) => {

      console.log("El response es ", response);
      this.fisioterapeutas = response;

    }, error => {
      console.log("Error", error.message);

    })


  }
  public onChange(dato, nombre) {
    if (nombre == "idFisioterapeuta") {


    } else if (nombre == "idPaciente") {




    } else if (nombre == "idCategoria") {
      this.parametros_busqueda["idCategoria"] = dato;
      this.cargarComboBoxTipoDeProductos(this.parametros_busqueda['idCategoria'])
      console.log(this.parametros_busqueda)
    } else if (nombre == "idTipoProducto") {
      this.parametros_busqueda["idTipoProducto"] = dato;
      console.log(this.parametros_busqueda);
      //una vez que modificamos el combobox de idTipoProducto recien podemos actualizar el Presentacion Producto combobox
      this.cargarComboBoxPresentacion(dato);


    }
  }

  public cargarComboBoxTipoDeProductos(idCategoria) {
    this.comisionesServices.getTipoProducto(idCategoria).subscribe((response: any) => {
      this.tipoProductos = response.lista;
      console.log('Los productos', this.tipoProductos)

    }, error => {
      console.log('Error ', error.message)
    })
  }

  public cargarComboBoxCategorias() {
    this.comisionesServices.getCategorias().subscribe((response) => {
      this.categorias = response.lista;
      console.log('Categorias ', this.categorias)
    }, error => {
      console.log('Error ', error.message)
    })
  }

  public cargarComboBoxPresentacion(idTipoProducto) {
    this.comisionesServices.getPresentaciones(idTipoProducto).subscribe((response: any) => {
      console.log("Las presentaciones son ", response.lista);
      this.presentacionProductos = response.lista;
      console.log("Los parametros son ", this.parametros_busqueda)

    }, error => {

      console.log("Error ", error.message);

    })

  }
  public abrirModalFisioterapeutas() {
    this.dialog.open(ModalFisioterapeutasComponent, {
      data: {
        fisioterapeutas: this.fisioterapeutas
      }
    }).afterClosed().subscribe((a) => {
      this.parametros_busqueda["idFisioterapeuta"] = parseInt(a);
      console.log(this.parametros_busqueda);

    })
  }
  abrirPopup(idComision, idEmpleado, idCategoria, idTipoProducto, idPresentacionProducto, porcentajeComision) {
    //le pasamos la clase del componente y los datos 

    console.log(idComision + " " + idEmpleado + " " + idCategoria + " " + idTipoProducto + " " + idPresentacionProducto + " " + porcentajeComision);
    this.router.navigate(["../crear-comisiones", "modificar", idComision, idEmpleado=="null"?"null" : idEmpleado, idCategoria, idTipoProducto, idPresentacionProducto, porcentajeComision], { relativeTo: this.route });




  }

  limpiar(){

    this.ngOnInit();
    this.parametros_busqueda = { "idFisioterapeuta": null, "idCategoria": null, "idTipoProducto": null, "idpresentacionproducto": null };

  }
}



//EL COMPONENTE DEL DIALOG
//SE TIENE QUE AGREGAR EN APP MODULE DECLARATIONS Y ENTRYPOINT
@Component({
  selector: 'dialog-comisiones',
  styleUrls: ['./listar-comisiones.component.css'],

  //se incluye el html dentro del component
  template:
    `
  <h2 mat-dialog-title>
  <span>
  Modificacion de Comision
  </span>
  </h2>

<mat-dialog-content>
  
    <mat-form-field>
        <input matInput 
                placeholder="El Identificador de la  comision "
                [(ngModel)]="data.idComision"      
                disabled>
    </mat-form-field>

  
    <div class="row">
    <div class="col-md-12">
      <legend>Fisioterapeutas</legend>
      <div class="row">
        <div class="col-md-12">
          <mat-form-field>
            <mat-select placeholder="Fisioterapeutas Disponibles"  
              (selectionChange)="onChange($event.value, 'idFisioterapeuta')"
             [(ngModel)]="data.idFisioterapeuta"
              name="idFisioterapeuta">
              <mat-option  *ngFor="let fisioterapeuta of data.listaEmpleados" [value]="fisioterapeuta.idPersona">
                {{fisioterapeuta.nombre}} {{fisioterapeuta.apellido}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <legend>Categoria</legend>
      <div class="row">
        <div class="col-md-12">
          <mat-form-field>
            <mat-select placeholder="Categorias" (selectionChange)="onChange($event.value, 'idCategoria')"
              [(ngModel)]="data.idCategoria" name="idCategoria">
              <mat-option *ngFor="let categoria of data.listaCategoria" [value]="categoria.idCategoria">
                {{categoria.descripcion}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <legend>Tipo de Producto</legend>
      <div class="row">
        <div class="col-md-12">
          <mat-form-field>
            <mat-select placeholder="Tipo de productos"
              (selectionChange)="onChange($event.value, 'idTipoProducto')"
              [(ngModel)]="data.idTipoProducto" name="idTipoProducto">
              <mat-option *ngFor="let tipoProducto of data.listaTipoProducto" [value]="tipoProducto.idTipoProducto">
                {{tipoProducto.descripcion}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <legend>Tipo de Servicio(Presentacion</legend>
      <div class="row">
        <div class="col-md-12">
          <mat-form-field>
            <mat-select placeholder="Tipo de Servicio(Presentacion)"
              (selectionChange)="onChange($event.value, 'presentacionProducto')"
              [(ngModel)]="data.idPresentacionProducto" name="idPresentacionProducto">
              <mat-option *ngFor="let presentacionProducto of data.listaPresentacionesProductos"
                [value]="presentacionProducto.idPresentacionProducto">
                {{presentacionProducto.nombre}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
    </div>
  </div>


    




 
</mat-dialog-content>

<mat-dialog-actions>
    <button  class="mat-raised-button"(click)="save()">Modificar</button>
    <button  class="mat-raised-button"(click)="close()">Cancelar</button>
</mat-dialog-actions>
`

})



export class DialogComisiones implements OnInit {



  public servicios: any[];
  public showspinnerpopup = false;


  constructor(
    public dialogRef: MatDialogRef<DialogComisiones>, private _snackBar: MatSnackBar, private comisionesServices: ComisionesServices,
    private router: Router,
    private route: ActivatedRoute,
    //any -> asi podemos enviar un objeto cualquiero con cualquier propiedad
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.cargarComboBoxTipoDeProductos(this.data.idCategoria);
    this.cargarComboBoxPresentacion(this.data.idTipoProducto);
    console.log("Data", this.data);


  }

  save() {





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

  public onChange(dato, nombre) {
    if (nombre == "idFisioterapeuta") {
      this.data["idFisioterapeuta"] = dato;


    } else if (nombre == "idPaciente") {




    } else if (nombre == "idCategoria") {
      this.data["idCategoria"] = dato;
      console.log(this.data);
      this.cargarComboBoxTipoDeProductos(this.data['idCategoria'])

    } else if (nombre == "idTipoProducto") {
      this.data["idTipoProducto"] = dato;
      //una vez que modificamos el combobox de idTipoProducto recien podemos actualizar el Presentacion Producto combobox
      this.cargarComboBoxPresentacion(dato);



    }
  }


  public cargarComboBoxTipoDeProductos(idCategoria) {
    this.comisionesServices.getTipoProducto(idCategoria).subscribe((response: any) => {
      this.data.listaTipoProducto = response.lista;

    }, error => {
      console.log('Error ', error.message)
    })
  }

  public cargarComboBoxCategorias() {
    this.comisionesServices.getCategorias().subscribe((response) => {
      this.data.listaCategoria = response.lista;
    }, error => {
      console.log('Error ', error.message)
    })
  }

  public cargarComboBoxPresentacion(idTipoProducto) {
    this.comisionesServices.getPresentaciones(idTipoProducto).subscribe((response: any) => {
      console.log("Las presentaciones son ", response.lista);
      this.data.listaPresentacionesProductos = response.lista;

    }, error => {

      console.log("Error ", error.message);

    })

  }



}



