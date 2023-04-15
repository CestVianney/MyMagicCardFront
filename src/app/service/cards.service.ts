import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  getCardsBeginningWith(name: string) {
    return this.http.get("http://localhost:8080/api/users/carte?name=" + name);

  }

  getCommandersBeginningWith(name: string, type: string): Observable<any> {
    return this.http.get('http://localhost:8080/api/cartes/cartetype?name=' + name + '&type=' + type);
  }

}
