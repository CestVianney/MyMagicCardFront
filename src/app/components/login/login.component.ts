import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenService } from 'src/app/service/token.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UsersService, private tokenService: TokenService, private router: Router) { }

  pseudo!: string;
  password!: string;
  isExistingUser!: boolean;
  ngOnInit(): void {
  }

  login(){
    this.userService.getUser(this.pseudo, this.password).subscribe((data) => {
      console.log(data);
      this.isExistingUser = true;
      this.tokenService.setActualUser(this.pseudo);
      this.router.navigate(['']);
    }, (error) => {
      this.isExistingUser = false;
      console.error(error);
    });;
  }

  onSubmit(){}

}
