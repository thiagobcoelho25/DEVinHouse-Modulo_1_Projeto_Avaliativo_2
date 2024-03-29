import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concat, delay, map, Observable, of } from 'rxjs';
import { Consulta } from '../shared/interfaces/consulta';
import { Exame } from '../shared/interfaces/exame';
import { Pacientes } from '../shared/interfaces/paciente';
import { PacienteProntuario } from '../shared/interfaces/paciente_prontuario';

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

  putPaciente(paciente: Pacientes): Observable<Pacientes> {
    return this.httpClient.put<Pacientes>(`${this.URL}/pacientes/${paciente.id}`, paciente);
  }

  getExames(): Observable<Exame[]> {
    return this.httpClient.get<Exame[]>(`${this.URL}/exames`);
  }

  getExame(exame_id: number): Observable<Exame> {
    return this.httpClient.get<Exame>(`${this.URL}/exames/${exame_id}`);
  }

  postNewExame(exame: Exame): Observable<Exame> {
    return this.httpClient.post<Exame>(`${this.URL}/exames`, exame);
  }

  putExame(exame: Exame): Observable<Exame> {
    return this.httpClient.put<Exame>(`${this.URL}/exames/${exame.id}`, exame);
  }

  deleteExame(id: number){
    return this.httpClient.delete<Exame>(`${this.URL}/exames/${id}`)
  }

  getConsultas(): Observable<Consulta[]> {
    return this.httpClient.get<Consulta[]>(`${this.URL}/consultas`);
  }

  getConsulta(consulta_id: number): Observable<Consulta> {
    return this.httpClient.get<Consulta>(`${this.URL}/consultas/${consulta_id}`);
  }

  postNewConsulta(consulta: Consulta): Observable<Consulta> {
    return this.httpClient.post<Consulta>(`${this.URL}/consultas`, consulta);
  }

  putConsulta(consulta: Consulta): Observable<Consulta> {
    return this.httpClient.put<Consulta>(`${this.URL}/consultas/${consulta.id}`, consulta);
  }

  deleteConsulta(id: number){
    return this.httpClient.delete<Consulta>(`${this.URL}/consultas/${id}`)
  }

  getPacienteExamesConsultas(id: number): Observable<PacienteProntuario> {
    return this.httpClient.get<PacienteProntuario>(`${this.URL}/pacientes/${id}?_embed=consultas&_embed=exames`);
  }

  deletePaciente(id: number) {
    return concat(this.getPacienteExamesConsultas(id).pipe(map(data => {
      if ((data.exames.length > 0 || data.consultas.length > 0) || !data) {
        throw new Error('Paciente Possui Exames/Consultas');
      } else {
        return data
      }
    }), delay(3000)), this.httpClient.delete<Pacientes>(`${this.URL}/pacientes/${id}`).pipe(catchError(err => {
      throw new Error('Erro Na Api de Deleção')
    })))
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
