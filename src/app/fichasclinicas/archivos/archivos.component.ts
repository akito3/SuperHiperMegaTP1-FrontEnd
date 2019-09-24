import { HttpClientModule, HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FichasClinicasService } from '../services/fichasClinicas.services';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import {Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { API_ENDPOINT } from 'src/app/util/constants';


@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
})
export class ArchivosComponent implements OnInit {

  public cvName: string='';
  @Output() onCompleteItem = new EventEmitter();
  @ViewChild('urlImagen', {static: false}) curriculumInput: ElementRef;

  public isLoadingCV: boolean=false;

  /**
   * Atributo que indica si ha ocurrido un error al cargar el CV
   */
  public errorCV: boolean=false;
  enviandoCambios:boolean = false;
  form:  FormGroup;
  public errorCVPesado: boolean=false;
  public error: 'Archivo pesado'|'Error en el servidor'|'';

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private fichasClinicasService: FichasClinicasService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar,public dialog: MatDialog) { }
  selectedFile: File =null;




  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('idFichaClinica');//Se obtiene el id de la ruta 
    this.form = this.formBuilder.group({
      nombre : new FormControl(''), //solo letras, requerido
      urlImagen: new FormControl(),//curriculumUrl
      idFichaClinica: new FormControl(id)
    });
  }




  onFileSeleted(event){
    console.log("antes de event");
    console.log(event);
    this.selectedFile =event.target.files[0];

  }
  onUpload(){
    const id = +this.route.snapshot.paramMap.get('idFichaClinica');//Se obtiene el id de la ruta 
    var x= id.toString();
    console.log('x ' + x);
    const fd = new FormData();
    fd.append('file', this.selectedFile);
    console.log('name ' + this.selectedFile.name);
    fd.append('nombre',this.selectedFile.name);
    fd.append('idFichaClinica',x);
    let headers= new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json'); 
    console.log(fd);
    this.http.post(API_ENDPOINT + 'stock-pwfe/fichaArchivo/archivo', fd, {headers: headers})
      .subscribe(res => {
        console.log(res);
      })
  }



  public onSubmit() {

    this.enviandoCambios = true;  
    console.log(this.form.value);
    this.fichasClinicasService.agregar(this.form.value).subscribe(
          data => this.recibidoCorrectamente(data),
          error=>this.errorRecibido(error)
        );
  }
  
  /**
   * Utiliza un SnackBar para informar al usuario que creó correctamente un postulante
   * @param data {Postulante} Datos del postulante
   */
  public recibidoCorrectamente(data){
    console.log("Creado "+data);;
  
  }

  public errorRecibido(error){
    this.enviandoCambios = false;
  }
  
  public vaciarInputCV(){
    this.isLoadingCV=false;
    this.curriculumInput.nativeElement.value='';
    this.cvName='';
    this.form.get('urlImagen').setValue('');
  }
  
  public cargarCV(){
    if(this.curriculumInput.nativeElement.files[0].size>1e+6){
      this.errorCV=true;
      this.errorCVPesado=true;
      this.vaciarInputCV();
      return ;
    }
      if (this.curriculumInput.nativeElement && this.curriculumInput.nativeElement.files[0]) {
      this.errorCVPesado=false;
      this.errorCV=false;
      this.isLoadingCV=true;
      this.enviar(this.curriculumInput,'urlImagen');
      this.cvName=this.curriculumInput.nativeElement.files[0].name;
    } 
    
  }

  public enviar(fileInput,campo: 'urlImagen'){
      let file: File= fileInput.nativeElement.files[0];
    this.fichasClinicasService.enviarArchivo(file).subscribe(
      (resultPath) => {
        this.form.get(campo).setValue(resultPath);
        if(campo=='urlImagen'){
          this.isLoadingCV=false;
        }
        console.log("Se subio correctamente el archivo");
      },
      (error) => {
        if(campo=='urlImagen'){
          this.errorCV=true;
          this.vaciarInputCV();
        }
        console.log("Ha ocurrido un error al subir el archivo");
      }
    );
      
    }

    onFileSelected(event){

    }

  }
