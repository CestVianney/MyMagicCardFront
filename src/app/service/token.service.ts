import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  constructor() { }

  private actualUser = new BehaviorSubject<string>('');
  private isLogged = new BehaviorSubject<boolean>(false);

  setActualUser(user: string) {
    this.actualUser.next(user);
    this.isLogged.next(true);
  }

  checkActualUser(): Observable<string> {
    return this.actualUser.asObservable();
  }

  checkLogged(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  logout() {
    this.actualUser.next('');
    this.isLogged.next(false);
  }


}
