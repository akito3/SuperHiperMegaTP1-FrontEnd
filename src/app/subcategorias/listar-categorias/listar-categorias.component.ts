import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material'; 
import { Router } from '@angular/router';
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
  constructor(private router: Router, public dataService: CategoriasService) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.dataService.getCategoriass1()
       .subscribe((response) => {
      // this.data = response['lista']
       this.dataSource = new MatTableDataSource(response.lista);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       this.totalCategorias = response['totalDatos'];
       });
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
