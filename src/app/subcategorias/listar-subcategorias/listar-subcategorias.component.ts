import { ServiciosService } from './../../servicios/services/servicios.services';
import { Component, OnInit, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SubcategoriasService } from 'src/app/services/subcategorias.service';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { CategoriasService } from 'src/app/services/categorias.service';
import { MatPaginatorIntl } from '@angular/material';
import { SubCategoria } from 'src/app/services/subcategoria';
declare const $: any;

@Component({
  selector: 'app-listar-subcategorias',
  templateUrl: './listar-subcategorias.component.html',
  styleUrls: ['./listar-subcategorias.component.css']
})
export class ListarSubcategoriasComponent implements OnInit {

  private showSpinner = null;
  private categoria: any[] = [];

  private totalDatos: Number = 0;
  public subcategoria: any[]; // marcos
  // inicializar en null
  private parametros_busqueda = {'idCategoria': null}; // marcos

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;
  private pagination = {
    inicio: 0,
    cantidad: 10,
  };
  private orderBy = null;
  private orderDir = null;



  idCategoria = null;
  seleccionar = {
    idCategoria: null
  };



  private nueva: any = {
    descripcion : null,
    idCategoria : {
      idCategoria : null
    }
  };


  constructor(private dataService: SubcategoriasService, private router: Router,
  private route: ActivatedRoute, public dialog: MatDialog,  private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSubcategorias();
    this.get_categorias();
  }

  getSubcategorias() {
    this.dataService.split({
      ...this.pagination,
      orderBy: this.orderBy,
      orderDir: this.orderDir,
      ejemplo: encodeURIComponent(JSON.stringify({
        idCategoria: this.seleccionar.idCategoria
      }))
    })
    .subscribe((response: any) => {
      this.subcategoria = response.lista;
      this.totalDatos = response['totalDatos'];
      console.log('Subcategorias', this.subcategoria);
    }, (error: any) => {
      console.log('Error al obtener los datos', error.message);
     }).add(() => {
       this.showSpinner = false;
     });
  }

  get_page(event) {
    this.pagination.cantidad = event.pageSize;
    this.pagination.inicio = event.pageSize * event.pageIndex;
    this.getSubcategorias();
  }

  get_categorias() {
    const param = this.parametros_busqueda[this.idCategoria] == null ? '' : this.parametros_busqueda[this.idCategoria];
    this.dataService.getCategoria(param).subscribe((response) => {
      this.categoria = response['lista'];
    });
  }

  ordenar(orderBy) {
    if (this.orderBy !== orderBy || this.orderDir === 'null') {
      this.orderBy = orderBy;
      this.orderDir = 'asc';
    } else if (this.orderDir === 'asc') {
      this.orderDir = 'desc';
    } else if (this.orderDir === 'desc') {
      this.orderBy = null;
      this.orderDir = null;
    }

    this.getSubcategorias();
  }
  agregarSub() {
    this.router.navigate(['dashboard/subcategorias/crear']);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  abrirPopup(idTipoProducto, descripcion) {
    console.log(idTipoProducto + ' ' + descripcion);
    // le pasamos la clase del componente y los datos
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        idTipoProducto: idTipoProducto,
        descripcion: descripcion,
        accion: 'modificacion'
      },
    }).afterClosed().subscribe((response) => {
      // y si reinicializamos
      if (response === 'modificado' || response === 'eliminado') {
        this.ngOnInit();
      }
    });
  }


  abrirPopupEliminar(idTipoProducto, descripcion) {
    console.log(idTipoProducto + ' ' + descripcion);
    // le pasamos la clase del componente y los datos
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        idTipoProducto: idTipoProducto,
        descripcion: descripcion,
        accion: 'eliminacion'
      },
    }).afterClosed().subscribe((response) => {
      // y si reinicializamos
      if (response === 'modificado' || response === 'eliminado') {
        this.ngOnInit();
      }
    });

  }
  agregar(send) {
    if (send) {
      this.nueva.idCategoria = this.seleccionar;
      this.dataService.agregarSubcategoria(this.nueva)
      .subscribe(() => {
        this.getSubcategorias();
        this.openSnackBar('Tipo de Producto creado con exito', 'Aviso');
      }, (error) => {
        this.openSnackBar('Tipo de Producto eliminado con exito', 'Aviso');
      });
    }
    this.nueva = {
      descripcion : null,
      idCategoria : {
        idCategoria : null
      }
    };
    $('#agregarSub').modal('hide');
  }


}

// EL COMPONENTE DEL DIALOG
// SE TIENE QUE AGREGAR EN APP MODULE DECLARATIONS Y ENTRYPOINT
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-overview-example-dialog',
  // se incluye el html dentro del component
  template:
    `
  <h2 mat-dialog-title>
  <span *ngIf="data.accion=='modificacion'">
  Modificacion de Tipo de Producto
  </span>
  <span *ngIf="data.accion=='eliminacion'">
  Eliminar Tipo de Producto
  </span>
  </h2>

<mat-dialog-content>
  <p *ngIf="data.accion=='eliminacion'">
      Estas seguro de querer eliminar este Tipo de Producto?
	</p>
    <mat-form-field *ngIf="data.accion=='modificacion'">
        <input matInput
                placeholder="Descripcion"
                [(ngModel)]="data.descripcion">
    </mat-form-field>
</mat-dialog-content>

<mat-dialog-actions>
    <button  class="mat-raised-button"(click)="close()">Cancelar</button>
    <button *ngIf="data.accion=='modificacion'" class="mat-raised-button mat-primary"(click)="save()">Modificar</button>
    <button *ngIf="data.accion=='eliminacion'" class="mat-raised-button mat-primary"(click)="eliminar()">Eliminar</button>

</mat-dialog-actions>

  `
})


// tslint:disable-next-line: component-class-suffix
export class DialogOverviewExampleDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private _snackBar: MatSnackBar, private dataService: SubcategoriasService,
    // any -> asi podemos enviar un objeto cualquiero con cualquier propiedad
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

  }

  save() {
    const objeto = {
      'idTipoProducto': this.data.idTipoProducto,
      'descripcion': this.data.descripcion,

    };
    this.dataService.modificarSubcategoria(objeto).subscribe((response: any) => {
      this.openSnackBar('Tipo de Producto modificada con exito', 'Aviso');
      this.dialogRef.close('modificado');


    }, (error: any) => {
      this.openSnackBar(error.message, 'Aviso');
      this.dialogRef.close('error');




    });
  }

  eliminar() {
    this.dataService.borrarSubcategoria(this.data.idTipoProducto).subscribe((response: any) => {
      this.openSnackBar('Tipo de Producto eliminado con exito', 'Aviso');
      this.dialogRef.close('eliminado');


    }, (error: any) => {
      this.openSnackBar(error.message, 'Aviso');
      this.dialogRef.close('error');


    });

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  close() {
    this.dialogRef.close('cancelado');
  }



}
