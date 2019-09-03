import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.services';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit() {
  }

  login() {
    this.loginService.loginUsuario(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          //faltaria pasar el user
          this.router.navigate(['../../dashboard'],{relativeTo : this.route});
        },
        error => {
          console.log('Error ! ', error.message)
        });

  }

}
