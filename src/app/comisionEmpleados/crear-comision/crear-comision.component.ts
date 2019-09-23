import { Component, OnInit, Inject } from '@angular/core';
import { ModalFisioterapeutasComponent } from 'src/app/util/modal-fisioterapeutas/modal-fisioterapeutas.component';
import { ComisionesServices } from '../services/comisiones.services';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-comision',
  templateUrl: './crear-comision.component.html',
  styleUrls: ['./crear-comision.component.css']
})
export class CrearComisionComponent implements OnInit {
  private fichasClinicas: any[];
  private fisioterapeutas: any[];
  private pacientes: any[];
  private categorias: any[];
  private tipoProductos: any[];
  private presentacionProductos: any[];
  private comisiones: any[];
  private accion = null;
  private showSpinner = false;
  public precio = null;
  private parametros_busqueda = { "idComision": null, "idFisioterapeuta": null, "idCategoria": null, "idTipoProducto": null, "idPresentacionProducto": null };
  public cantidad = 0;
  private detalles: any[];
  constructor(private comisionesServices: ComisionesServices,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.cargarComboBoxCategorias();
    this.cargarComboBoxFisioterapeutas();

    if (this.route.snapshot.paramMap.get("idComision") != "null") {
      this.parametros_busqueda["idComision"] = parseInt(this.route.snapshot.paramMap.get("idComision"));
    }
    if (this.route.snapshot.paramMap.get("idEmpleado") != "null" ) {
      this.parametros_busqueda["idFisioterapeuta"] = parseInt(this.route.snapshot.paramMap.get("idEmpleado"));
    }
    if (this.route.snapshot.paramMap.get("idCategoria") != "null") {
      this.parametros_busqueda["idCategoria"] = parseInt(this.route.snapshot.paramMap.get("idCategoria"));
    }
    if (this.route.snapshot.paramMap.get("idTipoProducto") != "null") {
      this.parametros_busqueda["idTipoProducto"] = parseInt(this.route.snapshot.paramMap.get("idTipoProducto"));
    }
    if (this.route.snapshot.paramMap.get("idPresentacionProducto") != "null") {
      this.parametros_busqueda["idPresentacionProducto"] = parseInt(this.route.snapshot.paramMap.get("idPresentacionProducto"));
    }
    if (this.route.snapshot.paramMap.get("porcentajeComision") != "null") {
      this.parametros_busqueda["porcentajeComision"] = parseFloat(this.route.snapshot.paramMap.get("porcentajeComision"));
    }
    if (this.route.snapshot.paramMap.get("accion") == "modificar") {
      this.cargarComboBoxCategorias();
      this.cargarComboBoxTipoDeProductos(this.parametros_busqueda["idCategoria"]);
      this.cargarComboBoxPresentacion(this.parametros_busqueda["idTipoProducto"]);
      this.accion = "modificar";
    } else {
      this.accion = "crear"
    }

    console.log("Los parametros de busqueda son ", this.parametros_busqueda)

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
    this.router.navigate(["../comisiones/crear-comisiones"], { relativeTo: this.route });
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



  public agregarComision(formData) {
    var objeto = {};

    console.log("Form Data value", formData.value);
    //preguntamos si se eleigio un fisioterapeuta en particular?
    let idPresentacionProducto = parseInt(formData.value["idPresentacionProducto"]);
    let idEmpleado = parseInt(formData.value["idFisioterapeuta"]);
    let porcentajeComision = parseFloat(formData.value["porcentajeComision"]);
    if (formData.value["idFisioterapeuta"] != null) {
      objeto["idPresentacionProducto"] = {
        "idPresentacionProducto": idPresentacionProducto

      };
      objeto["idEmpleado"] = {
        "idPersona": idEmpleado

      };
      objeto["porcentajeComision"] = porcentajeComision


    } else {
      objeto["idPresentacionProducto"] = {
        "idPresentacionProducto": idPresentacionProducto

      };
      objeto["porcentajeComision"] = porcentajeComision;
    }

    if (this.accion == "crear")
      this.comisionesServices.agregarComision(objeto).subscribe((response: any) => {
        this.openSnackBar("Comision creada con exito", "Aviso");


      }, error => {
        this.openSnackBar(error.message, "Aviso");



      })

      if (this.accion == "modificar")
      this.comisionesServices.modificarComision(objeto).subscribe((response: any) => {
        this.openSnackBar("Comision modificada con exito", "Aviso");


      }, error => {
        this.openSnackBar(error.message, "Aviso");



      })

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }





}



