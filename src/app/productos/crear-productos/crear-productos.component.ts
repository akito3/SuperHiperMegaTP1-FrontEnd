import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { ProductosService } from '../../services/productos/productos.service';
import { Productos, IdProducto, IdTipoProducto } from '../../services/productos/productos';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent implements OnInit {
  form: FormGroup;
  producto : Productos;
  constructor(private formBuilder: FormBuilder,
    private servicioAgregar: ProductosService,
    private router: Router) { }
  ngOnInit() {
    console.log("ngOnInit");
    this.form = this.formBuilder.group({
      nombre: new FormControl(''),
      // idPresentacionProducto: new FormControl(''),
      descripcion: new FormControl(''),
      idProducto: new FormControl(''),
      idTipoProducto: new FormControl('')
    } );
    console.log("form: ", this.form);
    console.log("fin de ngOnInit");
  }

  onSubmit() {
    console.log("onSubmit: ");
    console.log("producto: ", this.producto);
    this.producto = new Productos( null,null,null,null);
    // this.producto.idPresentacionProducto = Number(this.form.get('idPresentacionProducto').value);
    console.log("this.form.get('descripcion').value: ", this.form.get('descripcion').value);
    this.producto.descripcion = this.form.get('descripcion').value;

    console.log("this.form.get('nombre').value", this.form.get('nombre').value);
    this.producto.nombre = this.form.get('nombre').value;
    let idProducto : number = Number(this.form.get('idProducto').value);
    
    console.log("id.Producto.idProducto: ", idProducto);
    let numberIdTipoProducto =  Number(this.form.get('idTipoProducto').value)
    let tipoIdProducto: IdTipoProducto =  new IdTipoProducto( numberIdTipoProducto);
    
    console.log("tipoIdProducto: ", tipoIdProducto );
    this.producto.idProducto =   new IdProducto(idProducto , tipoIdProducto );
    console.log("this.producto.idProducto", this.producto.idProducto);
    console.log("producto: ", this.producto);
    // this.form.
    this.servicioAgregar.createProducto(this.producto)
      .subscribe(data => {
        console.log('producto agregado');
        swal({
          title: 'Guardado',
          text: 'El producto se ha almacenado correctamente',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          // tslint:disable-next-line: deprecation
        }).catch(swal.noop);
        this.onClickListar();
      },
      error => {
        console.log('producto error');
        swal({
          title: 'Error',
          text: 'El producto no se ha almacenado correctamente',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-danger',
          // tslint:disable-next-line: deprecation
        }).catch(swal.noop);
        this.onClickListar();
      });
  }

  onClickListar() {
    this.router.navigate(['dashboard/productos/listar']);
  }

  showSwal() {
    swal({
      title: 'Guardado',
      text: 'El productos se ha almacenado correctamente',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-success',
      type: 'success'
      // tslint:disable-next-line: deprecation
    }).catch(swal.noop);
  }
}
