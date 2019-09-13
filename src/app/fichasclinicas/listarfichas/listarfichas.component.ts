import { Component, OnInit } from '@angular/core';
import { FichasClinicasService } from '../services/fichasClinicas.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listarfichas',
  templateUrl: './listarfichas.component.html',
  styleUrls: ['./listarfichas.component.css']
})
export class ListarfichasComponent implements OnInit {


  private fichasClinicas: any[];
  private fisioterapeutas: any[];
  private pacientes: any[];
  private categorias: any[];
  private tipoProductos: any[];

  private parametros_busqueda = { 'idFisioterapeuta': undefined, 'idPaciente': undefined }

  constructor(
    //Dependency injection
    private fichasClinicasService: FichasClinicasService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.cargarListaFichasClinicas();
    this.cargarComboBoxFisioterapeutas();
    this.cargarComboBoxPacientes();
    this.cargarComboBoxCategorias();

  }

  public onChange(dato, nombre) {
    if (nombre == "idFisioterapeuta") {
      this.parametros_busqueda["idFisioterapeuta"] = dato;
      console.log(this.parametros_busqueda)
      this.getFichasPorFisioterapeuta(this.parametros_busqueda["idFisioterapeuta"])

    } else if (nombre == "idPaciente") {
      console.log('paciente')
      this.parametros_busqueda["idPaciente"] = dato;
      console.log(this.parametros_busqueda);
      this.getFichasPorPaciente(this.parametros_busqueda["idPaciente"])



    } else if (nombre == "idCategoria") {
      this.parametros_busqueda["idCategoria"] = dato;
      this.cargarComboBoxTipoDeProductos(this.parametros_busqueda['idCategoria'])
      console.log(this.parametros_busqueda)
    } else if (nombre == "idTipoProducto") {
      this.parametros_busqueda["idTipoProducto"] = dato;
      console.log(this.parametros_busqueda)
      this.getFichasPorTipoProducto(this.parametros_busqueda["idTipoProducto"])


    }
  }

  public getFichasPorPaciente(idPaciente) {
    this.fichasClinicasService.getFichasPorPaciente(idPaciente).subscribe((response: any) => {
      this.fichasClinicas = response.lista;
      console.log('A', this.fichasClinicas)

    }, error => {
      console.log('Error', error.message)
    })
  }

  public getFichasPorFisioterapeuta(idFisioterapeuta) {
    this.fichasClinicasService.getFichasPorFisioterapeuta(idFisioterapeuta).subscribe((response: any) => {
      this.fichasClinicas = response.lista;
      console.log('B', this.fichasClinicas)

    }, error => {
      console.log('Error', error.message)
    })
  }

  public getFichasPorTipoProducto(idTipoProducto) {
    this.fichasClinicasService.getFichasPorTipoDeProducto(idTipoProducto).subscribe((response: any) => {
      this.fichasClinicas = response.lista;
      console.log('C', this.fichasClinicas)

    }, error => {
      console.log('Error', error.message)
    })
  }

  public cargarComboBoxFisioterapeutas() {
    this.fichasClinicasService.getFisioterapeutas().subscribe((response: any) => {
      this.fisioterapeutas = response
    }, error => {
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
  public cargarListaFichasClinicas() {
    this.fichasClinicasService.getFichasClinicas().subscribe((response: any) => {
      this.fichasClinicas = response.lista;
      console.log("CargarListaFichasClinicas ", this.fichasClinicas);

    }, (error: any) => {
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

  irAfichaComponent(){
    console.log('->')
    this.router.navigate(['../agregar-nueva-ficha-clinica'],{relativeTo : this.route});

  }




}
