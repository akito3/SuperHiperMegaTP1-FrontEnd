import { Categoria } from './../../services/categoria';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-crear-categorias',
  templateUrl: './crear-categorias.component.html',
  styleUrls: ['./crear-categorias.component.css']
})
export class CrearCategoriasComponent implements OnInit {
  form: FormGroup;
  categoria: Categoria;
  constructor(private formBuilder: FormBuilder,
    private servicioAgregar: CategoriasService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      descripcion: new FormControl(''),
      flagVisible: new FormControl(''),
      posicion: new FormControl(''),
  });
  }
  public onSubmit() {
    console.log(this.form.value);
    this.servicioAgregar.agregarCategoria(this.form.value).subscribe(
      data => this.categoria);
      console.log(this.categoria);
    }
}
