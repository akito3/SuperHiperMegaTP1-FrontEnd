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
  objeto_a_enviar=null;


  constructor(private formBuilder: FormBuilder,
    private servicioAgregar: ProductosService,
    private router: Router) { }
  ngOnInit() {
    console.log("ngOnInit");
    this.form = this.formBuilder.group({

      codigo: new FormControl(''),
      idProducto: new FormControl(''),
      flagServicio: new FormControl(''),
      nombre: new FormControl(''),
      precioVenta: new FormControl(''),
    } );
    console.log("form: ", this.form);
    console.log("fin de ngOnInit");
  }

  onSubmit() {
    console.log("onSubmit: ");

    let entrada = this.form;
    var objeto = {
      "codigo":entrada.get('codigo').value,
      "flagServicio": entrada.get('flagServicio').value,
      // "descripcion": this.producto.descripcion,
      "idProducto": {
        "idProducto": entrada.get('idProducto').value,
      },
      "nombre": entrada.get('nombre').value,
      "existenciaProducto":{
        "precioVenta":entrada.get('precioVenta').value
        // "idTipoProducto" : {
          // "idTipoProducto" : this.producto.idProducto.idTipoProducto.idTipoProducto
        }
      // }
      // "idCliente": {
      //   "idPersona": idPaciente
      // },
    }
    
    this.objeto_a_enviar = objeto;
    this.servicioAgregar.createProducto(this.objeto_a_enviar)
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
