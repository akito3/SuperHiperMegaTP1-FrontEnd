import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/table';
import swal from 'sweetalert2';

import { PacientesService } from '../../services/pacientes/pacientes.service';
import { Pacientes } from '../../services/pacientes/pacientes';

declare const $: any;

@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.css']
})
export class ListarPacientesComponent implements OnInit {
  displayedColumns = ['idPersona', 'nombre', 'apellido', 'email', 'telefono', 'ruc',
    'cedula', 'tipoPersona', 'fechaNacimiento', 'accion'];
  dataSource: MatTableDataSource<Pacientes>;
  totalPacientes: number;

  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: false }) sort: MatSort;

  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  private pagination = {
    inicio: 0,
    cantidad: 5,
  };

  // Filtros
  private tipoBusqueda = '';
  // private valor = '';
  private nombreBusqueda = '';
  private cantidadBusqueda = 3;
  private ordernarBusqueda = 'desc';

  private orderBy: any ;
  private orderDir: any ;

  constructor(private router: Router, public dataService: PacientesService) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    console.log("listar-pacientes ngOnInit");
    this.getPacientes();
  }

  get_page(event) {
    console.log("get_page")
    this.ordenar(this.orderBy);
    this.pagination.cantidad = event.pageSize;
    console.log("paginator.cantidad: ", event.pageSize)
    this.pagination.inicio = event.pageSize * event.pageIndex;
    console.log("paginator.inicio: ", event.inicio)
    this.getPacientes();
  }

  
  getPacientes() {
    // this.ordenar(this.orderBy);
    this.dataService.split({ 
      ...this.pagination,
      orderBy: this.orderBy,
      orderDir: this.orderDir,
    })
    .subscribe((response) => {
      this.dataSource = new MatTableDataSource(response['lista']);
      this.totalPacientes = response['totalDatos'];
    });
  }
  // get_page(event) {
    //   this.pagination.cantidad = event.pageSize;
    //   this.pagination.inicio = event.pageSize * event.pageIndex;
    //   this.getCategorias();
    // }
    


    ordenar(orderBy: any) {
      console.log("listar-pacientes ordenar");
      if (this.orderBy !== orderBy || this.orderDir === 'null') {
        this.orderBy = orderBy;
        this.orderDir = 'asc';
      } else if (this.orderDir === 'asc') {
        this.orderDir = 'desc';
      } else if (this.orderDir === 'desc') {
        this.orderBy = null;
        this.orderDir = null;
      }
      // console.log("orderBy: ", this.orderBy);
      // console.log("orderDir: ", this.orderDir);
      this.getPacientes();
    }
    sortBy(orderBy: any) {
      console.log("listar-pacientes sortBy");
      if (this.orderBy !== orderBy || this.orderDir === 'null') {
        this.orderBy = orderBy;
        this.orderDir = 'asc';
      } else if (this.orderDir === 'asc') {
        this.orderDir = 'desc';
      } else if (this.orderDir === 'desc') {
        this.orderBy = null;
        this.orderDir = null;
      }
      // console.log("orderBy: ", this.orderBy);
      // console.log("orderDir: ", this.orderDir);
    }
    
    onClickFiltro() {
    console.log("iniciando onClickFiltro");
    
    let valor: any;
    
    valor = {nombre: this.nombreBusqueda};
    console.log("valor es: ",valor)
    if (this.tipoBusqueda === 'apellido') {
      valor = {
        cantidad: this.cantidadBusqueda.toString(),
        orderDir: this.ordernarBusqueda
      };
    } else if (this.tipoBusqueda === 'nombre') {
      valor = {nombre: this.nombreBusqueda};
    }
    if (this.tipoBusqueda === 'nombre' || this.tipoBusqueda === 'apellido'|| this.tipoBusqueda === 'like' || this.tipoBusqueda === 'fisioterapeutas') {
      this.dataService.getPacientesFiltro({tipo: this.tipoBusqueda, valor: valor})
        .subscribe(response => {
          console.log(response);
          this.dataSource = new MatTableDataSource(response.lista);
          this.totalPacientes = response['totalDatos'];
        });
    } else {
      this.getPacientes();
    }
  }

  onChange() {
    console.log(this.tipoBusqueda);
    if (this.tipoBusqueda === undefined) {
      this.nombreBusqueda = '';
      this.ordernarBusqueda = 'desc';
      this.cantidadBusqueda = 3;
      this.getPacientes();
    }
  }


  

  onClickAgregar() {
    this.router.navigate(['dashboard/pacientes/crear']);
  }

  onClickEditar(idPersona: any) {
    this.router.navigate(['dashboard/pacientes/editar/' + idPersona]);
  }

  onClickBorrar(idPersona: number) {
    if (confirm('¿Está seguro de que desea eliminar al paciente?')) {
      this.dataService.deletePaciente(idPersona)
        .subscribe(response => {
          console.log('paciente borrado');
          swal({
          title: 'Eliminado',
          text: 'El paciente se ha eliminado correctamente',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          // tslint:disable-next-line: deprecation
        }).catch(swal.noop);
        this.getPacientes();
      }, (error) => {
        console.log('paciente error');
          swal({
          title: 'Error',
          text: 'El paciente esta en uso',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-danger',
          // tslint:disable-next-line: deprecation
        }).catch(swal.noop);
        this.getPacientes();
      });
    }
  }

}
