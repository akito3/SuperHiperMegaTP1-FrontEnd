import { Component, OnInit } from '@angular/core';
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
  public subcategoria: any[]; //marcos
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
  labelCategoria = null;
  seleccionar = {
    idCategoria: null
  };
  

  private columns = [
    {
      label: 'Id',
      value: 'idTipoProducto',
      width: '10%'
    },
    {
      label: 'Descripcion',
      value: 'descripcion',
      width: '40%'
    },
  ]
  private nueva: any = {
    descripcion : null,
    idCategoria : {
      idCategoria : null
    }
  };
  private edit: any = {
    descripcion : null ,
    idCategoria : {
      idCategoria : null
    }
  };
  private delete: any = {};

  constructor(private dataService: SubcategoriasService, private router: Router,
  private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.getSubcategorias();
    this.get_categorias();
  }

  getSubcategorias() {
    this.dataService.get({
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
    this.dataService.getCat(param).subscribe((response) => {
      this.categoria = response['lista'];
    });
  }

  sortBy(orderBy) {
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

}
