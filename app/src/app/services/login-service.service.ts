import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Usuario } from '../shared/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http_client: HttpClient) { }


  url: string = 'http://localhost:3000'


  public login(username: string, password: string): Observable<any> {
    return this.http_client.get<Usuario[]>(`${this.url}/users`).pipe(
      map((data) => {
        const userExists = data.find(usuario => usuario.email === username && usuario.password === password)

        if (userExists) {
          this.setTokenLocalStorage({ token: 'TOKEN_USER_JWT_AUTHENTICATED' })
        }
        return data
      }), catchError((err) => {
        this.removerTokenLocalStorage();
        throw 'Falhaao efetuar Login'
      })
    )
  }

  public getToken(): string | null {
    return localStorage.getItem('token')
  }

  private setTokenLocalStorage(response: any): any {
    const { type, token, __ } = response

    localStorage.setItem('token', token)
  }

  private removerTokenLocalStorage() {
    localStorage.removeItem('token')
  }

}

// public login(username: string, password: string): Observable<any>{
  //   return this.http_client.post(`${this.url}/usuarios`, {username, password}, {responseType: 'json'}).pipe(
  //     map((data) => this.setTokenLocalStorage(data)), catchError((err) => {
  //       this.removerTokenLocalStorage();
  //       throw 'Falhaao efetuar Login'
  //     })
  //   )
  // }