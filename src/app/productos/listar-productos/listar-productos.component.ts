import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/table';
import swal from 'sweetalert2';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';


import { ProductosService } from '../../services/productos/productos.service';
import { Productos, IdProducto, IdTipoProducto, ListaProductos } from '../../services/productos/productos';

declare const $: any;

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  displayedColumns = ['nombre',   'descripcion', 'idPresentacionProducto', 'idProducto', 'idTipoProducto', 'accion' ];
  dataSource: MatTableDataSource<Productos>;
  dataSourceIdProductos: MatTableDataSource<IdProducto>;
  // dataSourceEP: MatTableDataSource<IdProducto>;
  totalProductos: number;

  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: false }) sort: MatSort;

  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  private pagination = {
    inicio: 0,
    cantidad: 5,
  };

  // Filtros
  private tipoBusqueda = '';
  // private valor = '';
  private nombreBusqueda = '';
  private idBusqueda = 0;
  private cantidadBusqueda = 3;
  private ordernarBusqueda = 'desc';

  private orderBy: any ;
  private orderDir: any;

  constructor(private router: Router, public dataService: ProductosService, public dataServiceId: ProductosService) { }

  applyFilter(filterValue: string) {
    console.log("apliFIlter");
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSourceIdProductos.filter = filterValue;
  }

  ngOnInit() {
    this.getProductos();
  }

  
  getProductos() {
    console.log(" listar-productos getProductos")
   this.dataService.split({
     ...this.pagination,
     orderBy: this.orderBy,
     orderDir: this.orderDir,
   })
   .subscribe((response) => {
     this.dataSource = new MatTableDataSource(response['lista']);
     this.dataSourceIdProductos = new MatTableDataSource(response['lista']);
     this.totalProductos = response['totalDatos'];
   });
 }

  onClickFiltro() {
    console.log("iniciando onClickFiltro");
    
    let valor: any;

    if (this.tipoBusqueda === 'idProducto' || this.tipoBusqueda === 'idTipoProducto' || this.tipoBusqueda === 'obtenerPrecio') { valor = { id : this.idBusqueda}; } 
    else if (this.tipoBusqueda === 'nombre' || this.tipoBusqueda === 'like') {valor = {nombre: this.nombreBusqueda};}

    if (this.tipoBusqueda === 'nombre'   || this.tipoBusqueda === 'like' ||  this.tipoBusqueda === 'idTipoProducto') {
      this.dataService.getProductosFiltro({tipo: this.tipoBusqueda, valor: valor}).subscribe(response => {
        this.dataSource = new MatTableDataSource(response.lista);
        this.totalProductos = response['totalDatos'];

      });
    }
    else if ( this.tipoBusqueda === 'idProducto') {
      this.dataServiceId.getIdProductoFiltro({tipo: this.tipoBusqueda, valor: valor}).subscribe(response => {
      let cantidad_elementos :number = response.lista.length;
      let dataSource : MatTableDataSource<IdProducto> = new MatTableDataSource(response.lista);
      let totalProductos :number  = response['totalDatos'];
      let arrayProductos = new Array<Productos>() ;
      let producto = new Productos(null, null, null, null,null,null,null);
      for (const k in response.lista) {
        
        producto.idProducto = new IdProducto(response.lista[k].idProducto, new IdTipoProducto(response.lista[k].idTipoProducto.idTipoProducto));
        arrayProductos.push(producto);
      }
      this.dataSource = new MatTableDataSource(arrayProductos);
      this.totalProductos = totalProductos;
      });
    }
    else if(this.tipoBusqueda ==='obtenerPrecio')  
    {
      console.log("existenciaProducto");
      this.dataServiceId.getExistenciaProductoFiltro({tipo: this.tipoBusqueda, valor: valor}).subscribe(response => {
      console.log("response: ", response);
      console.log("response.lista", response.lista);
      console.log("response['totalDatos']", response['totalDatos']);
      let cantidad_elementos :number = response.lista.length;
      // let dataSource : MatTableDataSource<IdProducto> = new MatTableDataSource(response.lista);
      // let totalProductos :number  = response['totalDatos'];
      // let arrayProductos = new Array<Productos>() ;
      // for (const k in response.lista) {
      //   let producto = new Productos(null, null, null, null);
      //   producto.idProducto = new IdProducto(response.lista[k].idProducto, new IdTipoProducto(response.lista[k].idTipoProducto.idTipoProducto));
      //   arrayProductos.push(producto);
      // }
      // this.dataSource = new MatTableDataSource(arrayProductos);
      // this.totalProductos = totalProductos;
      });
    }
       
     else {
      this.getProductos();
    }
  }

  onChange() {
    console.log("onChange");
    console.log(this.tipoBusqueda);
    if (this.tipoBusqueda === undefined) {
      this.nombreBusqueda = '';
      this.ordernarBusqueda = 'desc';
      this.cantidadBusqueda = 3;
      this.getProductos();
    }
  }

  get_page(event: { pageSize: number; pageIndex: number; }) {
    this.pagination.cantidad = event.pageSize;
    this.pagination.inicio = event.pageSize * event.pageIndex;
    this.getProductos();
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

  ordenar(orderBy: any) {
    console.log("listar-pacientes ordenar");
    if (this.orderBy !== orderBy || this.orderDir === 'null') {
      this.orderBy = orderBy;
      this.orderDir = 'asc';
    } 
    else if (this.orderDir === 'asc') {
      this.orderDir = 'desc';
    } 
    else if (this.orderDir === 'desc') {
      this.orderBy = null;
      this.orderDir = null;
    }

    this.getProductos();
  }
  

  onClickAgregar() {
    this.router.navigate(['dashboard/productos/crear']);
  }

  onClickEditar(idPresentacionProducto: any) {
    this.router.navigate(['dashboard/productos/editar/' + idPresentacionProducto]);
  }

  onClickBorrar(idPresentacionProducto: number) {
    console.log("onClickBorrar");
    if (confirm('¿Está seguro de que desea eliminar al producto?')) {
      this.dataService.deleteProducto(idPresentacionProducto)
        .subscribe(response => {
          console.log('producto borrado');
          swal({
          title: 'Eliminado',
          text: 'El producto se ha eliminado correctamente',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          // tslint:disable-next-line: deprecation
        }).catch(swal.noop);
        this.getProductos();
      }, (error) => {
        console.log('producto error');
          swal({
          title: 'Error',
          text: 'El producto esta en uso',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-danger',
          // tslint:disable-next-line: deprecation
        }).catch(swal.noop);
        this.getProductos();
      });
    }
  }

}
