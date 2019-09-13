import { Categoria } from './../../services/categoria';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css']
})
export class EditarCategoriasComponent implements OnInit {
  public form: FormGroup;
  categoria: Categoria;
  constructor(private formBuilder: FormBuilder,
    private servicioEditar: CategoriasService,
    private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.router.snapshot.paramMap.get('id'); // Se obtiene el id de la ruta para el servidor
    this.editar(id);
  }

  onSubmit() {

    if (this.form.valid) {
      this.servicioEditar.editarCategoria(
      this.form.value).subscribe(
        response => this.categoria);
   }

  }
  editar(id: number) {
    this.servicioEditar.getCategoriaById(id).subscribe(
      respuesta => {
        this.cargarFormulario(respuesta);
        console.log(respuesta);
      },
      error_respuesta => {
        console.log('Ha ocurrido un error al intentar cargar los datos');
    });
  }
  cargarFormulario(categoria: Categoria) {
    this.form = this.formBuilder.group({
      idCategoria : new FormControl (categoria.idCategoria),
      descripcion : new FormControl(categoria.descripcion),
      flagVisible : 'S',
      posicion: 1
    });
  }


  onClickListar() {
    this.route.navigate(['dashboard/categorias/listar']);
  }
}
