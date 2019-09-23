import { Component, OnInit } from '@angular/core';
import { FichasClinicasService } from '../services/fichasClinicas.services';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-agregararchivos',
  templateUrl: './agregararchivos.component.html',
})
export class AgregarArchivosComponent implements OnInit {

  private fichaArchivo: any[];
  private fichasClinicas: any[];
  private archivos: any[];
  private parametros_busqueda = { 'idFichaClinica': null }

  idFichaClinica = null;
  seleccionar = {
    idFichaClinica: null
  };

  constructor(private fichasClinicasService: FichasClinicasService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    this.parametros_busqueda = { 'idFichaClinica': null };
    this.cargarListaFichasArchivos();
    this.cargarComboBoxFichasClinicas();
  }

  public cargarListaFichasArchivos() {
    this.fichasClinicasService.getFichasArchivo().subscribe((response: any) => {
    this.fichaArchivo = response.lista;
    console.log("CargarListaFichasARCHIVOS ", this.fichaArchivo);
    }, (error: any) => {
      console.log('Error : ', error.message)
    });
  }



  public cargarComboBoxFichas1() {
    this.fichasClinicasService.getArchivoApartirDeFicha(this.idFichaClinica).subscribe((response: any) => {
      this.archivos = response.lista;
      console.log('Los productos', this.archivos)
    }, error => {
      console.log('Error ', error.message)
    })
  }

  cargarComboBoxFichas() {
    const param = this.parametros_busqueda[this.idFichaClinica] == null ? '' : this.parametros_busqueda[this.idFichaClinica];
    this.fichasClinicasService.getArchivoApartirDeFicha(param).subscribe((response) => {
      this.archivos = response['lista'];
      console.log('Los productos', this.archivos)
    });
  }

  eliminar(id: number): void {
    if (confirm('Esta seguro que desea borrar el Archivo?')) {
      this.fichasClinicasService.borrarArchivo(id).subscribe(() => {
        this.cargarListaFichasArchivos();
        alert('Archivo eliminada correctamente');
      }, (error) => {
        alert('Archivo esta en uso');
      });
    }
  }


  public cargarListaFichasClinicas() {
    this.fichasClinicasService.getFichasClinicas().subscribe((response: any) => {
      this.fichasClinicas = response.lista;
      console.log("CargarListaFichasClinicas ", this.fichasClinicas);
    }, (error: any) => {
      console.log('Error : ', error.message)
    });
  }



  public onChange(dato, nombre) {
    console.log(nombre, dato);
    this.fichasClinicasService.getArchivoApartirDeFicha(dato).subscribe((response: any) => {
      this.fichaArchivo = response.lista;
    }, error => {
      console.log('Error : ', error.message)
    })
 }

 public cargarComboBoxFichasClinicas() {
  this.fichasClinicasService.getFichasClinicas().subscribe((response: any) => {
    this.fichasClinicas = response.lista
    console.log("fichas clinicas: ", this.fichasClinicas);
  }, error => {
    console.log('Error : ', error.message)
  })
}

public filtrarArchivos() {
  this.fichasClinicasService.getArchivoApartirDeFicha(this.parametros_busqueda).subscribe((response: any) => {
    this.archivos = response.lista;
  }, error => {
    console.log('Error : ', error.message)
  })
}
;
   
}
