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
  displayedColumns = ['idCategoria', 'descripcion', 'flagVisible', 'posicion', 'accion'];
  dataSource: MatTableDataSource<Categoria>;
  agregar_Categoria: any = {descripcion: null, flagVisible: null, posicion: null};
  editar_Categoria: any = {descripcion: null, flagVisible: null, posicion: null};
  borrar_Categoria: any = {descripcion: null, flagVisible: null, posicion: null};
  totalCategorias: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort,  { static: false }) sort: MatSort;
  constructor(private router: Router, public dataService: CategoriasService) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.dataService.getCategorias()
       .subscribe((response) => {
      // this.data = response['lista']
       this.dataSource = new MatTableDataSource(response.lista);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       this.totalCategorias = response['totalDatos'];
       });
   }
}
