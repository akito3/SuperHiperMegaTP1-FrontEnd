import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { PacientesService } from '../../services/pacientes/pacientes.service';
import { Pacientes } from '../../services/pacientes/pacientes';

@Component({
  selector: 'app-crear-pacientes',
  templateUrl: './crear-pacientes.component.html',
  styleUrls: ['./crear-pacientes.component.css']
})
export class CrearPacientesComponent implements OnInit {
  form: FormGroup;
  paciente: Pacientes;

  constructor(private formBuilder: FormBuilder,
    private servicioAgregar: PacientesService,
    private router: Router) { }

  ngOnInit() {
    console.log("ngOnInit");
    this.form = this.formBuilder.group({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl(''),
      ruc: new FormControl(''),
      cedula: new FormControl(''),
      tipoPersona: new FormControl('FISICA'),
      fechaNacimiento: new FormControl('')
    });
    console.log("fin dengOnInit")
  }

  onSubmit() {
    this.form.value.fechaNacimiento = this.form.value.fechaNacimiento + ' 00:00:00';
    // if (this.form.value.fechaNacimiento !== '') {
    //   this.form.value.fechaNacimiento = this.form.value.fechaNacimiento + ' 00:00:00';
    // }

    console.log(this.form.value)
    this.paciente = new Pacientes(null, null, null, null, null, null, null, null, null);
    // console.log("json.paciente: ", JSON.parse(this.paciente.nombre) );
    this.paciente.apellido = this.form.get('apellido').value;
    // this.paciente.idPersona = Number(this.form.get('idPersona').value);
    this.paciente.nombre = this.form.get('nombre').value;
    this.paciente.cedula = this.form.get('cedula').value;
    this.paciente.ruc = this.form.get('ruc').value;
    this.paciente.email = this.form.get('email').value;
    this.paciente.fechaNacimiento = this.form.value.fechaNacimiento;
    this.paciente.tipoPersona = this.form.get('tipoPersona').value;
    this.paciente.telefono = this.form.get('telefono').value;

    this.servicioAgregar.createPaciente(this.paciente)
      .subscribe(data => {
        console.log('paciente agregado');
        swal({
          title: 'Guardado',
          text: 'El paciente se ha almacenado correctamente',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          // tslint:disable-next-line: deprecation
        }).catch(swal.noop);
        this.onClickListar();
      },
      error => {
        console.log('paciente error');
        swal({
          title: 'Error',
          text: 'El paciente no se ha almacenado correctamente',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-danger',
          // tslint:disable-next-line: deprecation
        }).catch(swal.noop);
        this.onClickListar();
      });
  }

  onClickListar() {
    this.router.navigate(['dashboard/pacientes/listar']);
  }

  showSwal() {
    swal({
      title: 'Guardado',
      text: 'El pacientes se ha almacenado correctamente',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-success',
      type: 'success'
      // tslint:disable-next-line: deprecation
    }).catch(swal.noop);
  }
}
