import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  postNewUser(username: string, password: string): Observable<any> { 
    return this.http.post("http://localhost:8080/api/users/createUser?username=" + username + "&password=" + password, null);
  }

  getUser(username: string, password: string) {
    return this.http.get("http://localhost:8080/api/users/existingUser?username="+username+"&password="+password).pipe(
      map((response: any) => {
        // Vérifiez si la réponse est un objet boolean
          return response;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError('Data not found');
        }
        return throwError('Error retrieving data');
      })
    );;
  }
}
