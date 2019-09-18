import { Component, OnInit, Inject } from '@angular/core';
import { ServiciosService } from '../../services/servicios.services';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { FichasClinicasService } from 'src/app/fichasclinicas/services/fichasClinicas.services';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-listar-detalles-asociados',
  templateUrl: './listar-detalles-asociados.component.html',
  styleUrls: ['./listar-detalles-asociados.component.css']
})
export class ListarDetallesAsociadosComponent implements OnInit {


  private fichasClinicas: any[];
  private fisioterapeutas: any[];
  private pacientes: any[];
  private categorias: any[];
  private tipoProductos: any[];
  private presentacionProductos: any[];
  private showSpinner = false;
  public precio = null;
  private parametros_busqueda = {}
  public cantidad = 0;
  private detalles: any[];
  constructor(private serviciosServices: ServiciosService, private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.cargarComboBoxCategorias();
    this.cargarDetallesAsociados();
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


    } else if (nombre == "presentacionProducto") {
      console.log("PRESENTACION PRODUCTO")
      this.parametros_busqueda["idPresentacionProducto"] = dato;
      console.log("Los parametros son", this.parametros_busqueda);
      //Ahora recien actualizamos el textbox del precio!
      console.log("DATO ", dato);
      this.consultarPrecio(dato);


    }
  }

  public cargarDetallesAsociados() {
    this.showSpinner = true;
    this.serviciosServices.getDetallesAsociados(this.route.snapshot.paramMap.get("idservicio")).subscribe((response: any) => {
      this.detalles = response;

      console.log("detalles asociados", this.detalles)
      var Servicio = this.serviciosServices;
      this.detalles.forEach(function(elemento){
            Servicio.getPrecio(elemento.idPresentacionProducto.idPresentacionProducto).subscribe((response :  any)=>{
                  elemento["precioVenta"] = response.lista[0].precioVenta;
                //  console.log("precio venta",  response.lista[0].precioVenta);
                

            },error =>{
                console.log("ERROR", error.message);

            })


      });

    }, error => {
      console.log("error", error.message)

    }).add(()=>{
        this.showSpinner = false;

    })


  }









  public cargarComboBoxTipoDeProductos(idCategoria) {
    this.serviciosServices.getTipoProducto(idCategoria).subscribe((response: any) => {
      this.tipoProductos = response.lista;
      console.log('Los productos', this.tipoProductos)

    }, error => {
      console.log('Error ', error.message)
    })
  }

  public cargarComboBoxCategorias() {
    this.serviciosServices.getCategorias().subscribe((response) => {
      this.categorias = response.lista;
      console.log('Categorias ', this.categorias)
    }, error => {
      console.log('Error ', error.message)
    })
  }

  public cargarComboBoxPresentacion(idTipoProducto) {
    this.serviciosServices.getPresentaciones(idTipoProducto).subscribe((response: any) => {
      console.log("Las presentaciones son ", response.lista);
      this.presentacionProductos = response.lista;
      console.log("Los parametros son ", this.parametros_busqueda)

    }, error => {

      console.log("Error ", error.message);

    })


  }
  public consultarPrecio(idPresentacion) {

    this.serviciosServices.getPrecio(idPresentacion).subscribe((response: any) => {
      console.log("PRECIO", response);
      this.precio = response.lista[0].precioVenta;
      console.log("THIS PRECIO", this.precio)
    }, error => {
      console.log("Error", error.message);

    })

  }

  public abrirpopupagregardetalle() {
    let dialogRef = this.dialog.open(DialogAgregarNuevoDetalle, {
      data: {
        precioVenta: this.precio,
        cantidad: this.cantidad,
        idservicio: parseInt(this.route.snapshot.paramMap.get("idservicio")),
        idpresentacion: parseInt(this.parametros_busqueda["idPresentacionProducto"])
      },
    }).afterClosed().subscribe((response) => {
      //y si reinicializamos
      if (response == "agregado") {
        console.log("reinicializamos");
        this.parametros_busqueda = {};
        this.precio = null;
        this.cantidad = 0;
        this.ngOnInit();

      }

    })


  }

  public abrirPopupEliminacion(iddetalle){

    console.log("idDetalle", iddetalle);
    this.dialog.open(DialogEliminarDetalle,{
      data : {
        iddetalle : iddetalle,
        idservicio: parseInt(this.route.snapshot.paramMap.get("idservicio")),


      },


    }).afterClosed().subscribe((response : any)=>{
      //y si reinicializamos la pagina
      if(response=="eliminado"){
          this.ngOnInit();

      }


    })
  }
}

//EL COMPONENTE DEL DIALOG
//SE TIENE QUE AGREGAR EN APP MODULE DECLARATIONS Y ENTRYPOINT
@Component({
  selector: 'dialog-agregar-nuevo-detalle',
  //se incluye el html dentro del component
  template:
    `
  <h2 mat-dialog-title>
  <span>
  Agregar Nuevo Detalle
  </span>
  </h2>

<mat-dialog-content>
<mat-form-field>
<input matInput 
        placeholder="El identificador del servicio"
        [(ngModel)]="data.idservicio"      
        disabled>
</mat-form-field>

  
    <mat-form-field>
        <input matInput 
                placeholder="Precio de Venta"
                [(ngModel)]="data.precioVenta"      
                disabled>
    </mat-form-field>

    <mat-form-field>
        <input matInput 
                placeholder="La cantidad es"
                [(ngModel)]="data.cantidad"      
                >
    </mat-form-field>

    


 
</mat-dialog-content>

<mat-dialog-actions>
    <button  class="mat-raised-button"(click)="save()">Agregar!</button>
    <button  class="mat-raised-button"(click)="close()">Cancelar</button>
</mat-dialog-actions>
`

})



export class DialogAgregarNuevoDetalle implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAgregarNuevoDetalle>, private _snackBar: MatSnackBar, private serviciosServices: ServiciosService,
    //any -> asi podemos enviar un objeto cualquiero con cualquier propiedad
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

  }

  save() {
    let objeto = { "cantidad": this.data.cantidad, "idPresentacionProducto": { "idPresentacionProducto": this.data.idpresentacion }, "idServicio": { "idServicio": this.data.idservicio } };
    this.serviciosServices.agregarDetalleAsociado(objeto).subscribe((response: any) => {
      this.openSnackBar("Se a agregado el detalle con exito", "aviso");
      this.dialogRef.close("agregado")

    }, error => {
      console.log("Error", error.message);
      this.openSnackBar(error.message, "Aviso");
      this.dialogRef.close("error")

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
  selector: 'dialog-eliminar-detalle',
  //se incluye el html dentro del component
  template:
    `
  <h2 mat-dialog-title>
  <span>
  Eliminar detalle asociado
  </span>
  </h2>

<mat-dialog-content>
<mat-form-field>
<input matInput 
        placeholder="El identificador del servicio"
        [(ngModel)]="data.idDetalle"      
        disabled>
</mat-form-field>

  
    <h4>Estas seguro de eliminar</h4>
    


 
</mat-dialog-content>

<mat-dialog-actions>
    <button  class="mat-raised-button"(click)="eliminar()">Eliminar!</button>
    <button  class="mat-raised-button"(click)="close()">Cancelar</button>
</mat-dialog-actions>
`

})



export class DialogEliminarDetalle implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarDetalle>, private _snackBar: MatSnackBar, private serviciosServices: ServiciosService,
    //any -> asi podemos enviar un objeto cualquiero con cualquier propiedad
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

  }

  save() {
    let objeto = { "cantidad": this.data.cantidad, "idPresentacionProducto": { "idPresentacionProducto": this.data.idpresentacion }, "idServicio": { "idServicio": this.data.idservicio } };
    this.serviciosServices.agregarDetalleAsociado(objeto).subscribe((response: any) => {
      this.openSnackBar("Se a agregado el detalle con exito", "aviso");
      this.dialogRef.close("agregado")

    }, error => {
      console.log("Error", error.message);
      this.openSnackBar(error.message, "Aviso");
      this.dialogRef.close("error")

    })


  }

  eliminar() {
    this.serviciosServices.eliminarDetalleAsociado(this.data.idservicio,this.data.iddetalle).subscribe((response: any)=>{
        this.openSnackBar("Detalle eliminado", "Aviso");
        this.dialogRef.close("eliminado");


    },error =>{
      this.openSnackBar(error.message, "Aviso");
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

