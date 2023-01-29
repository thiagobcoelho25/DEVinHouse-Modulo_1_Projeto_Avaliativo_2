import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concat, map, Observable } from 'rxjs';
import { Usuario } from '../shared/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http_client: HttpClient) { }

  url: string = 'http://localhost:3000'


  public login(user_email: string, password: string): Observable<any> {
    return this.http_client.get<Usuario[]>(`${this.url}/users`).pipe(
      map((data) => {
        const userExists = data.find(usuario => usuario.email === user_email && usuario.password === password)

        if (userExists) {
          this.setTokenLocalStorage({token: JSON.stringify({ nome: userExists.name })})
        }
        return data
      }), catchError((err) => {
        this.removerTokenLocalStorage();
        throw 'Falhaao efetuar Login'
      })
    )
  }

  public getUsers(new_user: Usuario): Observable<any> {
    return concat(this.http_client.get<Usuario[]>(`${this.url}/users`).pipe(
      map(data => {
        const userExists = data.find(usuario => usuario.email === new_user.email)

        if (userExists) {
          throw new Error('usuario ja existe');
        }
      })), this.createUser(new_user).pipe(catchError(err => {
          throw new Error('Erro Na Api de Criação')
      })))
  }

  public createUser(usuario: Usuario): Observable<any> {
    return this.http_client.post<Usuario>(`${this.url}/users`, usuario)
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

  public logout(){
    this.removerTokenLocalStorage()
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