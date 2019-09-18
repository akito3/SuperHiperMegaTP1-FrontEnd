import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-clientes',
  template:
    `
<h2 mat-dialog-title>
<span>
    Modal Clientes
</span>
</h2>

<mat-dialog-content>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header card-header-icon card-header-rose">
          <div class="card-icon">
            <i class="material-icons">assignment</i>
          </div>
          <h4 class="card-title ">Listado de Clientes</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead class="text-primary">
                <tr>
                  <th>Id</th>
                  <th>nombre Completo</th>
                  <th>Accion</th>
            
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of data.clientes" style="cursor:pointer">
                   <td (click)="close(item.idPersona)">{{item.idPersona}}</td>
                   <td (click)="close(item.idPersona)">{{item.nombreCompleto}}</td>
                   <td (click)="close(item.idPersona)">Seleccionar!</td>

                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>


    </div>
  </div>





</mat-dialog-content>
`
})
export class ModalClientesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalClientesComponent>, private _snackBar: MatSnackBar,
     //any -> asi podemos enviar un objeto cualquiero con cualquier propiedad
     @Inject(MAT_DIALOG_DATA) public data: any) { }

   

  ngOnInit() {
    console.log("Data en el modal clientes" , this.data.clientes)
  }


  close(idPersona) {
    this.dialogRef.close(idPersona)
  }

}




