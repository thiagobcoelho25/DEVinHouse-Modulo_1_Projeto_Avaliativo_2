import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EMPTY, iif, map, mergeMap, switchMap } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { Consulta } from 'src/app/shared/interfaces/consulta';
import { Pacientes } from 'src/app/shared/interfaces/paciente';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  disable_input_search: boolean = false

  edit_mode: boolean = false
  form_cadatro_consulta: FormGroup
  paciente_selected!: Pacientes
  frase_apos_submit: string = ""
  id!: number

  min_date_picker: Date

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private api_backend: BackendService) {
    this.form_cadatro_consulta = this.fb.group({
      switch_edit: new FormControl({ disabled: true, value: false }),
      motivo: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      data_da_consulta: new FormControl({ disabled: true, value: new Date() }, Validators.required),
      hora_da_consulta: new FormControl(new Date().toISOString().substring(0,10) , Validators.required),
      descricao: new FormControl("", [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
      medicacao: new FormControl(""),
      dosagem: new FormControl("", [Validators.required, Validators.minLength(16), Validators.maxLength(256)]),
    })

    this.min_date_picker = new Date()
  }

  ngOnInit(): void {
    /* 1º - pegar consulta pelo id do consulta 
      2º - Se existir id, pegar paciente*/
    this.activatedRoute.params.pipe(mergeMap((params: Params) => iif(() => {
      this.id = +params['id']
      this.edit_mode = params['id'] != null
      this.disable_input_search = params['id'] != null ? true : false
      return params['id'] ? true : false
    }, this.api_backend.getConsulta(+params['id']).pipe(map(x => {
      this.form_cadatro_consulta.get('switch_edit')?.enable()
      this.setFormToEdit(x)
      return x
    }), switchMap(consulta => this.api_backend.getPacienteById(consulta.pacienteId))), EMPTY)))
      .subscribe({
        next: value => {
          this.paciente_selected = value

        }, error: err => {
          console.log("Error na subscrible de consulta: ", err)
        }
      })


    this.form_cadatro_consulta.get('hora_da_consulta')?.setValue(`${this.min_date_picker.getHours()}:${this.min_date_picker.getMinutes()}`)
  }


  onSubmit() {
    if(this.edit_mode){
      const consulta: Consulta = {
        data_da_consulta: this.form_cadatro_consulta.get('data_da_consulta')?.value,
        motivo: this.form_cadatro_consulta.get('motivo')?.value,
        hora_da_consulta: this.form_cadatro_consulta.get('hora_da_consulta')?.value,
        dosagem_e_precauções: this.form_cadatro_consulta.get('dosagem')?.value,
        descricao_do_problema: this.form_cadatro_consulta.get('descricao')?.value,
        medicacao_receitada: this.form_cadatro_consulta.get('medicacao')?.value,
        pacienteId: this.paciente_selected.id!,
        id: this.id
      }

      this.api_backend.putConsulta(consulta).subscribe({next: value => {
        this.frase_apos_submit = 'edit_appointment'
      }, error: err => {
        this.frase_apos_submit = 'error'
      }})

    } else {
      const consulta: Consulta = {
        data_da_consulta: this.form_cadatro_consulta.get('data_da_consulta')?.value,
        motivo: this.form_cadatro_consulta.get('motivo')?.value,
        hora_da_consulta: this.form_cadatro_consulta.get('hora_da_consulta')?.value,
        dosagem_e_precauções: this.form_cadatro_consulta.get('dosagem')?.value,
        descricao_do_problema: this.form_cadatro_consulta.get('descricao')?.value,
        medicacao_receitada: this.form_cadatro_consulta.get('medicacao')?.value,
        pacienteId: this.paciente_selected.id!,
        id: null
      }

      this.api_backend.postNewConsulta(consulta).subscribe({next: value => {
        this.frase_apos_submit = 'new_appointment'
      }, error: err => {
        this.frase_apos_submit = 'error'
      }})
    }
  }


  setFormToEdit(consulta: Consulta) {
    this.form_cadatro_consulta.patchValue({
      motivo: consulta.motivo,
      data_da_consulta: new Date(consulta.data_da_consulta), 
      hora_da_consulta: consulta.hora_da_consulta,
      descricao: consulta.descricao_do_problema,
      medicacao: consulta.medicacao_receitada,
      dosagem: consulta.dosagem_e_precauções
    })
  }

  paciente_is_selected(paciente: Pacientes) {
    this.paciente_selected = paciente
    this.edit_mode = false
    // ja esta ocorendo na pipe
    // this.form_cadatro_consulta.get('switch_edit')?.disable()
  }

  deleteAppointment() {
    this.api_backend.deleteConsulta(this.id).subscribe({next: value => {
      this.frase_apos_submit = 'delete_appointment'
    }, error: err => {
      this.frase_apos_submit = 'error'
    }})
  }

  getErrorMessageMotivo() {
    if (this.form_cadatro_consulta.get('motivo')?.hasError('required')) {
      return 'Motivo é Obrigatorio';
    }

    return (this.form_cadatro_consulta.get('motivo')?.hasError('minlength') || this.form_cadatro_consulta.get('motivo')?.hasError('maxlength')) ? 'Motivo deve ter entre 8 a 64 caracteres' : '';
  }

  getErrorMessageDatePicker() {
    return this.form_cadatro_consulta.get('data_da_consulta')?.hasError('required') ? 'Data da Consulta Obrigatoria' : '';
  }

  getErrorMessageDateTime() {
    return this.form_cadatro_consulta.get('hora_da_consulta')?.hasError('required') ? 'Hora da Consulta Obrigatoria' : '';
  }

  getErrorMessageDescricao() {
    if (this.form_cadatro_consulta.get('descricao')?.hasError('required')) {
      return 'Descrição é Obrigatorio';
    }

    return (this.form_cadatro_consulta.get('descricao')?.hasError('minlength') || this.form_cadatro_consulta.get('descricao')?.hasError('maxlength')) ? 'Descrição deve ter entre 16 a 1024 caracteres' : '';
  }

  getErrorMessageDosagem() {
    if (this.form_cadatro_consulta.get('dosagem')?.hasError('required')) {
      return 'Dosagem é Obrigatorio';
    }

    return (this.form_cadatro_consulta.get('dosagem')?.hasError('minlength') || this.form_cadatro_consulta.get('dosagem')?.hasError('maxlength')) ? 'Motivo deve ter entre 16 a 256 caracteres' : '';
  }

  getIfFormIsDirtyOrTouched(control: string) {
    return this.form_cadatro_consulta.controls[control].invalid && (this.form_cadatro_consulta.controls[control].dirty || this.form_cadatro_consulta.controls[control].touched)
  }

}
