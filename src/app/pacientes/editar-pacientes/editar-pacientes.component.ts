import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

import { Pacientes } from '../../services/pacientes/pacientes';
import { PacientesService } from '../../services/pacientes/pacientes.service';

@Component({
  selector: 'app-editar-pacientes',
  templateUrl: './editar-pacientes.component.html',
  styleUrls: ['./editar-pacientes.component.css']
})
export class EditarPacientesComponent implements OnInit {
  public form: FormGroup;
  paciente: Pacientes;

  constructor(private formBuilder: FormBuilder,
    private servicioEditar: PacientesService,
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
    this.form.value.fechaNacimiento = this.form.value.fechaNacimiento + ' 00:00:00';
    console.log(this.form.value);

    // if (this.form.value.fechaNacimiento !== '') {
    //   this.form.value.fechaNacimiento = this.form.value.fechaNacimiento + ' 00:00:00';
    // } 
    // // else {
    //   this.form.value.fechaNacimiento = this.form.value.fechaNacimiento + ' 00:00:00';
    // }
    
    if (this.form.valid) {
      console.log('if my log');
      console.log(this);
      let paciente:Pacientes = new Pacientes(null, null, null, null, null, null, null, null, null);
      paciente.nombre = this.form.value.nombre;
      paciente.apellido = this.form.value.apellido;
      paciente.idPersona = this.form.value.idPersona;
      paciente.fechaNacimiento = this.form.value.fechaNacimiento;
      paciente.cedula = this.form.value.cedula;
      paciente.tipoPersona = this.form.value.tipoPersona;
      paciente.telefono = this.form.value.telefono;
      paciente.ruc = this.form.value.ruc;
      paciente.email = this.form.value.email;
      this.servicioEditar.editPaciente(paciente).subscribe( response => { console.log('paciente editado'); 
        swal({
            title: 'Guardado',
            text: 'El paciente se ha editado correctamente',
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
            text: 'El paciente no se ha editado correctamente',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-danger',
            // tslint:disable-next-line: deprecation
          }).catch(swal.noop);
          this.onClickListar();
        });
    }
    else{console.log('else my log');}
    
  }

  editar(idPersona: number) {
    console.log("editar formulario: ", idPersona);
    this.servicioEditar.getPacienteById(idPersona).subscribe(respuesta => 
      { 
      console.log("llenar formulario")
        this.cargarFormulario(respuesta);
        console.log(respuesta);
        console.log("formulario llenado")
      },
      error_respuesta => {
        console.log('Ha ocurrido un error al intentar cargar los datos');
      });
  }

  cargarFormulario(paciente: Pacientes) {
    console.log("cargando formulario");
    console.log("paciente: ",paciente);
    this.form = this.formBuilder.group({
      idPersona: new FormControl(paciente.idPersona),
      nombre: new FormControl(paciente.nombre),
      apellido: new FormControl(paciente.apellido),
      telefono: new FormControl(paciente.telefono),
      email: new FormControl(paciente.email),
      ruc: new FormControl(paciente.ruc),
      cedula: new FormControl(paciente.cedula),
      tipoPersona: new FormControl(paciente.tipoPersona),
      fechaNacimiento: new FormControl(paciente.fechaNacimiento)
    });
    
    console.log("formulario cargado");
    console.log("nombre: ",this.form.get("nombre").value);
  }

  onClickListar() {
    this.route.navigate(['dashboard/pacientes/listar']);
  }
}
