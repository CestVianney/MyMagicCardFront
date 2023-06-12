import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }
  actualUser = '';

  ngOnInit(): void {
    this.tokenService.checkActualUser().subscribe(response => this.actualUser = response);
  }

  login(): void {
    if(this.actualUser == '') {
    this.router.navigate(['/login']);
    }
  }

  accessDecklist(): void {
    if(this.actualUser != '') {
    this.router.navigate(['/decklist', this.actualUser]);
    }
  }

}
