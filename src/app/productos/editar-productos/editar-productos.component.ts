import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

import { Productos } from '../../services/productos/productos';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit {
  public form: FormGroup;
  producto: Productos;

  constructor(private formBuilder: FormBuilder,
    private servicioEditar: ProductosService,
    private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit() {
    console.log("ngOnInit");
    const id = +this.router.snapshot.paramMap.get('id'); // Se obtiene el id de la ruta para el servidor
    this.editar(id);
    console.log("fin ngOnInit");
  }

  onSubmit() {
    console.log("onSubmit");
    console.log(this.form.value);

    
    if (this.form.valid) {
      console.log('if my log');
      console.log(this.form.value);
      this.servicioEditar.editProducto(this.form.value).subscribe( response => { console.log('Producto editado'); 
        swal({
            title: 'Guardado',
            text: 'El Producto se ha editado correctamente',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success',
            // tslint:disable-next-line: deprecation
          }).catch(swal.noop);
          this.onClickListar();
        },
        error => {
          console.log('Producto error');
          swal({
            title: 'Error',
            text: 'El Producto no se ha editado correctamente',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-danger',
            // tslint:disable-next-line: deprecation
          }).catch(swal.noop);
          this.onClickListar();
        });
    }
    else{console.log('else my log');}
    
  }

  editar(idPresentacionProducto: number) {
    console.log("editar formulario: ", idPresentacionProducto);
    this.servicioEditar.getProductoById(idPresentacionProducto).subscribe(respuesta => 
      { 
      console.log("llenar formulario")
        this.cargarFormulario(respuesta);
        console.log("respuesta: ", respuesta);
        console.log("formulario llenado")
      },
      error_respuesta => {
        console.log('Ha ocurrido un error al intentar cargar los datos');
      });
  }

  cargarFormulario(producto: Productos) {
    console.log("cargando formulario");
    this.form = this.formBuilder.group({
      // idPresentacionProducto: new FormControl(producto.idPresentacionProducto),
      nombre: new FormControl(producto.nombre),
      descripcion: new FormControl(producto.descripcion),
      idProducto: new FormControl(producto.idProducto.idProducto),

    });
    console.log("formulario cargado");
  }

  onClickListar() {
    this.route.navigate(['dashboard/productos/listar']);
  }
}
