import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ExcepcionesService } from 'src/app/services/excepciones.service';
@Component({
  selector: 'app-configurar-excepciones',
  templateUrl: './configurar-excepciones.component.html',
  styleUrls: ['./configurar-excepciones.component.css']
})
export class ConfigurarExcepcionesComponent implements OnInit {


  private showSpinner = null;
  private fisioterapeutas: any[];
  public reservas: any[];
  // inicializar en null 
  private parametros_busqueda = { 'idFisioterapeuta': null, 'fechadesde': null, 'fechahasta': null };

  constructor(
    // Dependency injection
    private excepcionService: ExcepcionesService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fisioterapeutas = [];
    this.reservas = [];
    this.parametros_busqueda = { 'idFisioterapeuta': null, 'fechadesde': null, 'fechahasta': null };
    this.cargarListaReservas();
    this.cargarComboBoxFisioterapeutas();
  }

  public onChange(dato, nombre) {
    if (nombre === 'idFisioterapeuta') {
      this.parametros_busqueda['idFisioterapeuta'] = dato;
      console.log(this.parametros_busqueda);
    } else if (nombre === 'fechadesde') {
      console.log('Se cambio el fechadesde');
      // Obtenemos el valor obtenidos del datepicker y lo convertimos a formato YYYYMMDD
      this.parametros_busqueda['fechadesde'] = (new Date(dato)).toISOString().slice(0, 10).replace(/-/g, '');
      console.log(this.parametros_busqueda);
    } else if (nombre === 'fechahasta') {
      console.log('se cambio el fechahasta');
      // Obtenemos el valor obtenidos del datepicker y lo convertimos a formato YYYYMMDD
      this.parametros_busqueda['fechahasta'] = (new Date(dato)).toISOString().slice(0, 10).replace(/-/g, '');
      console.log(this.parametros_busqueda);
    }
  }


  public cargarListaReservas() {
    this.showSpinner = true;
    this.excepcionService.getExcepciones().subscribe((response: any) => {
      this.reservas = response.lista;
      console.log('Las reservas son', this.reservas);
    }, (error: any) => {
      console.log('Error al obtener reservas', error.message);

    }).add(() => {
        this.showSpinner = false;
    });


  }
  public cargarComboBoxFisioterapeutas() {
    this.excepcionService.getFisioterapeutas().subscribe((response: any) => {
      this.fisioterapeutas = response;
    }, error => {
      console.log('Error : ', error.message);
    });
  }

  public filtrarReservas() {
    this.showSpinner = true;

    this.excepcionService.getReservasFiltradas(this.parametros_busqueda).subscribe((response: any) => {
      this.reservas = response.lista;
    }, error => {
      console.log('Error al filtrar ', error.message);


    }).add(() => {

        this.showSpinner = false;


    });


  }

  public irAagregarReservaComponent() {

    this.router.navigate(['../agregar-reservas'], { relativeTo: this.route });



  }
 

  irAcrearFicha(idEmpleado, idCliente){
    this.router.navigate(['./../../fichas-clinicas/agregar-nueva-ficha-clinica', idEmpleado, idCliente], {relativeTo : this.route});
  }



}
