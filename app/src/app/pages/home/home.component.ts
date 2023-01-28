import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { Consulta } from 'src/app/shared/interfaces/consulta';
import { Exame } from 'src/app/shared/interfaces/exame';
import { Pacientes } from 'src/app/shared/interfaces/paciente';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lista_pacientes: Pacientes[] = []
  lista_exames: Exame[] = []
  lista_consultas: Consulta[] = []

  lista_pacietes_filtrada: Pacientes[] = []

  constructor(private backend_api: BackendService) {
  }

  ngOnInit(): void {
    const api_calls_join = forkJoin({
      lista_pacientes: this.backend_api.getPacientes().pipe(catchError(error => of(false))),
      lista_exames: this.backend_api.getExames().pipe(catchError(error => of(false))),
      lista_consultas: this.backend_api.getConsultas().pipe(catchError(error => of(false)))
    }).pipe(catchError(error => of(error)))

    api_calls_join.subscribe({
      next: (data) => {
        this.lista_pacientes = data.lista_pacientes
        this.lista_exames = data.lista_exames
        this.lista_consultas = data.lista_consultas
        this.lista_pacietes_filtrada = data.lista_pacientes
      }
    })

    // this.backend_api.getPacientes().subscribe({
    //   next: data => {
    //     this.lista_pacientes = data
    //   },
    //   error: (error) => {
    //     console.log("error na api backend: ", error)
    //     this.erro_backend_api = true
    //   }
    // })
  }

  termFilter(term: string) {
    if(this.lista_pacientes){
      this.lista_pacietes_filtrada = this.lista_pacientes.filter(elem => elem.nome.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
    }
  }

  isString(value: any): boolean { 
    return typeof value === 'string'; 
  }



}
