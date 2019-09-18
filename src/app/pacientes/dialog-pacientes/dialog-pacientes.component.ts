import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { PacientesService } from '../../services/pacientes/pacientes.service';

@Component({
  selector: 'app-dialog-pacientes',
  templateUrl: './dialog-pacientes.component.html'
})
export class DialogPacientesComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogPacientesComponent>,
    private _snackBar: MatSnackBar,
    private dataService: PacientesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() { }

  eliminar() {
    this.dataService.deletePaciente(this.data.paciente.idPersona).subscribe(
      response => {
        this.openSnackBar('Paciente eliminado con exito', 'Aviso');
        this.dialogRef.close('eliminado');
      },
      error => {
        this.openSnackBar(error.message, 'Aviso');
        this.dialogRef.close('error');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  close() {
    this.dialogRef.close('cancelado');
  }

}
