import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/table';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/services/categoria';

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


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,  { static: false }) sort: MatSort;


  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
   // MatPaginator Output
   pageEvent: PageEvent;
  private pagination = {
    inicio: 0,
    cantidad: 10,
  };
  orderDir: any;
  orderBy: any;
  constructor(private router: Router, public dataService: CategoriasService) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.dataService.getCategorias({
      ...this.pagination,
      orderBy: this.orderBy,
      orderDir: this.orderDir, })
       .subscribe((response) => {
       this.dataSource = new MatTableDataSource(response.lista);
       this.totalCategorias = response['totalDatos'];
       });
   }


   get_page(event: { pageSize: number; pageIndex: number; }) {
    this.pagination.cantidad = event.pageSize;
    this.pagination.inicio = event.pageSize * event.pageIndex;
    this. getCategorias();
  }
  sortBy(orderBy: any) {
    if (this.orderBy !== orderBy || this.orderDir === 'null') {
      this.orderBy = orderBy;
      this.orderDir = 'asc';
    } else if (this.orderDir === 'asc') {
      this.orderDir = 'desc';
    } else if (this.orderDir === 'desc') {
      this.orderBy = null;
      this.orderDir = null;
    }
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



}
