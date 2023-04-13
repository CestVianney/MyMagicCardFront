import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  constructor() { }

  private actualUser = new BehaviorSubject<string>('');

  setActualUser(user: string) {
    this.actualUser.next(user);
  }

  checkActualUser(): Observable<string> {
    return this.actualUser.asObservable();
  }

  logout() {
    this.actualUser.next('');
  }


}
