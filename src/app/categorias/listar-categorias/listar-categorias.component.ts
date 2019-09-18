import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/services/categoria';
import { MatPaginatorIntl } from '@angular/material';

declare const $: any;

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit {
  displayedColumns = ['idCategoria', 'descripcion', 'accion'];
  dataSource: MatTableDataSource<Categoria>;
  totalCategorias: number;
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  private count: Number = 0;
  private data: any[] = [];
  // MatPaginator Output
  pageEvent: PageEvent;
  private pagination = {
    inicio: 0,
    cantidad: 10,
  };
  orderDir: any;
  orderBy: any;
  constructor(public dialog: MatDialog, private router: Router, public dataService: CategoriasService) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit() {
    this.getCategorias();
  }



   getCategorias() {
    this.dataService.split({
      ...this.pagination,
      orderBy: this.orderBy,
      orderDir: this.orderDir,
    })
    .subscribe((response) => {
      this.dataSource = new MatTableDataSource(response['lista']);
      this.totalCategorias = response['totalDatos'];
    });
  }


  get_page(event) {
    this.pagination.cantidad = event.pageSize;
    this.pagination.inicio = event.pageSize * event.pageIndex;
    this.getCategorias();
  }


  ordenar(orderBy: any) {
    if (this.orderBy !== orderBy || this.orderDir === 'null') {
      this.orderBy = orderBy;
      this.orderDir = 'asc';
    } else if (this.orderDir === 'asc') {
      this.orderDir = 'desc';
    } else if (this.orderDir === 'desc') {
      this.orderBy = null;
      this.orderDir = null;
    }
    this.getCategorias();
  }

   onClickAgregar() {
    this.router.navigate(['dashboard/categorias/crear']);
   }
   onClickEditar(id: any) {
    this.router.navigate(['dashboard/categorias/editar/' + id]);
   }

   onDeleteCategoria(id: number): void {
    if (confirm('Esta seguro que desea borrar la Categoria?')) {
      this.dataService.borrarCategoria(id).subscribe(() => {
        this.getCategorias();
        alert('Categoría eliminada correctamente');
      }, (error) => {
        alert('La categoría esta en uso');
      });
    }
  }
  abrirPopup(idCategoria, descripcion) {
    console.log(idCategoria + ' ' + descripcion);
    // le pasamos la clase del componente y los datos
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        idCategoria: idCategoria,
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
  abrirPopupEliminar(idCategoria, descripcion) {
    console.log(idCategoria + ' ' + descripcion);
    // le pasamos la clase del componente y los datos
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        idCategoria: idCategoria,
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
  Editar Categoría
  </span>
  <span *ngIf="data.accion=='eliminacion'">
  Eliminar Categoría
  </span>
  </h2>

<mat-dialog-content>
<mat-form-field *ngIf="data.accion=='modificacion'">
<input matInput 
        placeholder="Nro Categoria"
        [(ngModel)]="data.idCategoria"
        disabled>
</mat-form-field>

    <p *ngIf="data.accion=='eliminacion'">
      Esta seguro de querer eliminar esta Categoría?
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
  public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private _snackBar: MatSnackBar, private dataService: CategoriasService,
  // any -> asi podemos enviar un objeto cualquiero con cualquier propiedad
  @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {}


  save() {
    const objeto = {
      'idCategoria': this.data.idCategoria,
      'descripcion': this.data.descripcion,

    };
    this.dataService.editarCategoria(objeto).subscribe((response: any) => {
      this.openSnackBar('Categoría modificada con exito', 'Aviso');
      this.dialogRef.close('modificado');


    }, (error: any) => {
      this.openSnackBar(error.message, 'Aviso');
      this.dialogRef.close('error');
    });
  }
  eliminar() {
    this.dataService.borrarCategoria(this.data.idCategoria).subscribe((response: any) => {
    this.openSnackBar('Categoria eliminada con exito', 'Aviso');
    this.dialogRef.close('Eliminado');
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

export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = 'Items por página';
  nextPageLabel     = 'Página siguiente';
  previousPageLabel = 'Página anterior';
  firstPageLabel = 'Primera página';

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };

}
