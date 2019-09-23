import { Component, OnInit } from '@angular/core';
import { FichasClinicasService } from '../services/fichasClinicas.services';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-agregarfichas',
  templateUrl: './agregarfichas.component.html',
  styleUrls: ['./agregarfichas.component.css']
})
export class AgregarfichasComponent implements OnInit {


  private fichasClinicas: any[];
  private fisioterapeutas: any[];
  private fichaArchivo: any[];
  private pacientes: any[];
  private categorias: any[];
  private tipoProductos: any[];
  private idFisioterapeuta = null;
  public selectedFisioterapeuta = null;
  public selectedPaciente = null;

  public observacion = null;
  public motivoConsulta = null;
  public diagnostico = null;

  constructor(private fichasClinicasService: FichasClinicasService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.cargarComboBoxFisioterapeutas();
    this.cargarComboBoxPacientes();
    this.cargarComboBoxCategorias();
    this.route.snapshot.paramMap.get("idEmpleado") == "null" ? this.selectedFisioterapeuta = null : this.selectedFisioterapeuta = parseInt(this.route.snapshot.paramMap.get("idEmpleado"));
    this.route.snapshot.paramMap.get("idCliente") == "null" ? this.selectedPaciente = null : this.selectedPaciente = parseInt(this.route.snapshot.paramMap.get("idCliente"));
    this.fichasClinicasService.getFichasArchivo().subscribe((response:any)=>
    {
      this.fichaArchivo = response;
      console.log("archivitos:",this.fichaArchivo);
    })

  }
  public cargarComboBoxFisioterapeutas() {
    this.fichasClinicasService.getFisioterapeutas().subscribe((response: any) => {
      this.fisioterapeutas = response;
      console.log("Los fisioterapeuta son", this.fisioterapeutas);
    }, error => {
      console.log('Error : ', error.message)
    })
  }

  public cargarComboBoxPacientes() {
    this.fichasClinicasService.getPacientes().subscribe((response: any) => {
      this.pacientes = response;
    }, (error: any) => {
      console.log('Error : ', error.message)
    })

  }
  public cargarComboBoxTipoDeProductos(idCategoria) {
    this.fichasClinicasService.getTipoProducto(idCategoria).subscribe((response: any) => {
      this.tipoProductos = response.lista;
      console.log('Los productos', this.tipoProductos)

    }, error => {
      console.log('Error ', error.message)
    })
  }

  public cargarComboBoxCategorias() {
    this.fichasClinicasService.getCategorias().subscribe((response) => {
      this.categorias = response.lista;
      console.log('Categorias ', this.categorias)
    }, error => {
      console.log('Error ', error.message)
    })
  }

  public onChange(dato, nombre) {
    if (nombre == "idCategoria") {
      this.cargarComboBoxTipoDeProductos(dato)
    }
  }

  public agregarFichaClinica(formData) {


    this.fichasClinicasService.agregarFichaClinica(
      {
        "motivoConsulta": formData.value['motivoConsulta'],
        "diagnostico": formData.value['diagnostico'],
        "observacion": formData.value["observacion"],
        "idEmpleado": formData.value["idFisioterapeuta"],
        "idCliente": formData.value["idPaciente"],
        "fecha": formData.value["fecha"],
        "idTipoProducto": formData.value["idTipoProducto"]
      }

    ).subscribe((response: any) => {
      console.log("El response es ", response);
      this.openSnackBar("Ficha clinica agregada con exito", "aviso");
      this.diagnostico = null;
      this.motivoConsulta= null;
      this.observacion = null;



    }, (error: any) => {
      console.log("El error es ", error.message);
      this.openSnackBar(error.message, "Error al agregar ficha clinica");




    })


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }









}
