import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class CanaccessGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.tokenService.checkLogged().pipe(
      tap(
        logged => {
          if(!logged) {
            this.router.navigate(['/login']);
          }
        }
      ));
  }
  
}
