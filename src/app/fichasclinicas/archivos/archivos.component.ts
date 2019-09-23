import { Component, OnInit } from '@angular/core';
import { FichasClinicasService } from '../services/fichasClinicas.services';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
})
export class ArchivosComponent implements OnInit {



  constructor(private fichasClinicasService: FichasClinicasService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');//Se obtiene el id de la ruta 

  }


  public onSubmit() {

   
}

}
/**
 * form: FormGroup;
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
      console.log('categoria agregada');
      swal({
        title: 'Guardado',
        text: 'La categoria se ha almacenado correctamente',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success',
      // tslint:disable-next-line: deprecation
      }).catch(swal.noop);
      this.onClickListar();
    }
    public onClickListar(){
      this.router.navigate(['dashboard/categorias/listar']);
    }
    public showSwal(){
      swal({
        title: 'Guardado',
        text: 'La categoria se ha almacenado correctamente',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success',
        type: 'success'
    // tslint:disable-next-line: deprecation
    }).catch(swal.noop);
    }
*/