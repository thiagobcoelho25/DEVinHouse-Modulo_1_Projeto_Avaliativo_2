import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { concat, delay, finalize, switchMap } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { PacienteProntuario } from 'src/app/shared/interfaces/paciente_prontuario';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {
  id!: number
  paciente_prontuario!: PacienteProntuario

  carregando_dados: boolean = true
  erro_dados: boolean = false

  constructor(private activatedRoute: ActivatedRoute, private api_backend: BackendService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap((params: Params) => {
      this.id = +params['id']
      return this.api_backend.getPacienteExamesConsultas(this.id).pipe(delay(3000))
    })).subscribe({
      next: data => {
        this.paciente_prontuario = data
        this.carregando_dados = false
      }, error: err => {
        this.erro_dados = true
        console.log('Error da Inicialização do prontuario:', err)
      }
    })
    
  }

}
