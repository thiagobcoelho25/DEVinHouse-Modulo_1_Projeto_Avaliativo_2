import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Consulta } from '../shared/interfaces/consulta';
import { Exame } from '../shared/interfaces/exame';
import { Pacientes } from '../shared/interfaces/paciente';

@Injectable({
  providedIn: 'root'
})
export class BackendService {


  private URL: string = "http://localhost:3000"

  constructor(private httpClient: HttpClient) { }


  getPacientes(): Observable<Pacientes[]> {
    return this.httpClient.get<Pacientes[]>(`${this.URL}/pacientes`);
  }

  getPacienteById(id: number): Observable<Pacientes> {
    return this.httpClient.get<Pacientes>(`${this.URL}/pacientes/${id}`);
  }

  postNewPaciente(paciente: Pacientes): Observable<Pacientes> {
    return this.httpClient.post<Pacientes>(`${this.URL}/pacientes`, paciente);
  }

  // atualizar paciente
  putPaciente(paciente: Pacientes): Observable<Pacientes> {
    return this.httpClient.put<Pacientes>(`${this.URL}/pacientes/${paciente.id}`, paciente);
  }


  getExames(): Observable<Exame[]> {
    return this.httpClient.get<Exame[]>(`${this.URL}/exames`);
  }

  getConsultas(): Observable<Consulta[]> {
    return this.httpClient.get<Consulta[]>(`${this.URL}/consultas`);
  }


  /// getArticles(): Observable<Article[]> {
  //   return this.httpClient.get<Article[]>(this.URL).pipe(retry(1), catchError(this.handleError<Article[]>('getArticles', [])));
  // }

  // createArticle(artigo: PostArticle) {
  //   return this.httpClient.post<PostArticle>(this.URL, artigo).pipe(catchError(this.handleErrorAndThrow<Article>('createArticle')));
  // }

  // deleteArticle(id: number): Observable<Article[]> {
  //   return this.httpClient.delete<Article[]>(`${this.URL}/${id}`).pipe(catchError(this.handleErrorAndThrow<Article[]>('deleteArticle')));
  // }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error("console.log do servico: ", error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     ////this.log(`${operation} failed: ${error.message}`);
  //     let errorMessage = ""
  //     if (error.error instanceof ErrorEvent) {
  //       // Get client-side error
  //       errorMessage = error.error.message;
  //     } else {
  //       // Get server-side error
  //       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //     }

  //     window.alert(errorMessage);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);

  //     // caso queira passar o error para o componente
  //     // documentação ANGULAR para tratamento error do http
  //     // https://stackoverflow.com/questions/44385777/how-does-http-error-handling-work-with-observables
  //     // throw error;
  //   };
  // }

  // private handleErrorAndThrow<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error("console.log do servico: ", error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     ////this.log(`${operation} failed: ${error.message}`);
  //     let errorMessage = ""
  //     if (error.error instanceof ErrorEvent) {
  //       // Get client-side error
  //       errorMessage = error.error.message;
  //     } else {
  //       // Get server-side error
  //       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //     }

  //     window.alert(errorMessage);

  //     throw error;
  //   };
  // }

}
