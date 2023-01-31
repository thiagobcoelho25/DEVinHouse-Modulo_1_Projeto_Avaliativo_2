import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { Consulta } from 'src/app/shared/interfaces/consulta';
import { Exame } from 'src/app/shared/interfaces/exame';
import { PacienteProntuario } from 'src/app/shared/interfaces/paciente_prontuario';

interface ExameConsulta {
  id: number,
  pacienteId: number
  data: string,
  hora: string
  motivo: string | null,
  descricao_do_problema: string | null,
  medicacao_receitada: string | null,
  dosagem_e_precaucoes: string | null,
  nome_do_exame: string | null,
  tipo_do_exame: string | null,
  laboratorio: string | null,
  url_do_documento_do_exame: string | null,
  resultado_do_exame: string | null,
  tipo: string
}

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.scss']
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
    }).add(() => {
      this.carregando_dados = false
    })

  }

  get exames_consultas_prontuario() {
    const exames_consultas: ExameConsulta[] = [...this.paciente_prontuario.consultas, ...this.paciente_prontuario.exames].map(ele => {
      if (ele.hasOwnProperty('data_da_consulta')) {
        const ele_consulta = ele as Consulta
        return {
          data: new Date(ele_consulta.data_da_consulta).toLocaleDateString('pt-BR'),
          hora: ele_consulta.hora_da_consulta,
          id: ele_consulta.id,
          motivo: ele_consulta.motivo,
          descricao_do_problema: ele_consulta.descricao_do_problema,
          medicacao_receitada: ele_consulta.medicacao_receitada,
          dosagem_e_precaucoes: ele_consulta.dosagem_e_precauções,
          pacienteId: ele_consulta.pacienteId,
          tipo: "consulta"
        } as ExameConsulta
      } else { 
        const ele_exame = ele as Exame
        return {
          id: ele_exame.id,
          data: new Date(ele_exame.data_do_exame).toLocaleDateString('pt-BR'),
          hora: ele_exame.hora_do_exame,
          laboratorio: ele_exame.laboratorio,
          nome_do_exame: ele_exame.nome_do_exame,
          resultado_do_exame: ele_exame.resultado_do_exame,
          tipo_do_exame: ele_exame.tipo_do_exame,
          url_do_documento_do_exame: ele_exame.url_do_documento_do_exame,
          pacienteId: ele_exame.pacienteId,
          tipo: "exame"
        } as ExameConsulta
      }
    })

    return exames_consultas.sort((a, b) => {
        return Date.parse(a.data) - Date.parse(b.data)
      })
  }

}


// descricao_do_problema: string,
//     medicacao_receitada: string,
//     dosagem_e_precauções