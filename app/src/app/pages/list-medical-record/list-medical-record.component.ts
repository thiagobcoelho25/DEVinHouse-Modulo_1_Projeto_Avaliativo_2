import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { Pacientes } from 'src/app/shared/interfaces/paciente';

@Component({
  selector: 'app-list-medical-record',
  templateUrl: './list-medical-record.component.html',
  styleUrls: ['./list-medical-record.component.scss']
})
export class ListMedicalRecordComponent implements OnInit {

  lista_pacientes: Pacientes[] = []
  term_search: string = ''

  carregando_form: boolean = false
  erro_api_backend: boolean = false

  constructor(privateactivatedRoute: ActivatedRoute, private api_backend: BackendService){

  }

  ngOnInit(): void {
    this.carregando_form = true
    this.api_backend.getPacientes().pipe(delay(3000)).subscribe({next: value => {
      this.lista_pacientes = value
    }, error: error => {
      this.erro_api_backend = true
    }}).add(() => {
      this.carregando_form = false
    })
  }

  get lista_filtrada(): Pacientes[] {
    return this.lista_pacientes.filter(elem => elem.nome.toLocaleLowerCase().includes(this.term_search.toLocaleLowerCase()))
  }

  termFilter(term: string) {
    this.term_search = term
  }

}
