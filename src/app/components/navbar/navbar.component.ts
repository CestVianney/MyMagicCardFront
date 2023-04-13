import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private tokenService: TokenService) { }
  actualUser = '';
  ngOnInit(): void {
    this.tokenService.checkActualUser().subscribe(response => this.actualUser = response);
  }

  logout() {
    this.tokenService.logout();
  }

}
