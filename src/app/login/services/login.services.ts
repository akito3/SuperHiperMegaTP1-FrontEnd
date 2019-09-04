import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.services';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public showSpinner : boolean;
  public errorMessage : string =""
  public hasError : boolean;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  
  }


  ngOnInit() {

  }

  login() {
    this.showSpinner = true;// spinner on
    this.loginService.loginUsuario(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          //faltaria pasar el user
          this.hasError = false
          this.router.navigate(['../../dashboard'], { relativeTo: this.route });
        },
        error => {
          console.log('Error ! ', error.message);
          this.hasError = true
          this.errorMessage = error.message
        }).add(() => {

          this.showSpinner = false;
    
        });

  }

}
