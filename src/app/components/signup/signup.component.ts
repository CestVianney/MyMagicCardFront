import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UsersService, private router: Router) { }

  pseudo!: string;
  password!: string;

  ngOnInit(): void {
  }

  signup() {
    this.userService.postNewUser(this.pseudo, this.password).subscribe((response) => console.log(response));
    this.router.navigate(['/']);
  }

}
