import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EMPTY, iif, map, mergeMap, switchMap } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { Exame } from 'src/app/shared/interfaces/exame';
import { Pacientes } from 'src/app/shared/interfaces/paciente';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  disable_input_search: boolean = false

  edit_mode: boolean = false
  form_cadatro_exame: FormGroup
  paciente_selected!: Pacientes
  frase_apos_submit: string = ""
  id!: number

  min_date_picker: Date

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private api_backend: BackendService) {
    this.form_cadatro_exame = this.fb.group({
      switch_edit: new FormControl({ disabled: true, value: false }),
      nome_do_exame: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      data_do_exame: new FormControl({ disabled: true, value: new Date() }, Validators.required),
      hora_do_exame: new FormControl(new Date().toISOString().substring(0,10) , Validators.required),
      tipo_do_exame: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(32)]),
      laboratorio: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(32)]),
      url_do_exame: new FormControl(""),
      resultado_do_exame: new FormControl("", [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
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
    }, this.api_backend.getExame(+params['id']).pipe(map(x => {
      this.form_cadatro_exame.get('switch_edit')?.enable()
      this.setFormToEdit(x)
      return x
    }), switchMap(exame => this.api_backend.getPacienteById(exame.pacienteId))), EMPTY)))
      .subscribe({
        next: value => {
          this.paciente_selected = value

        }, error: err => {
          console.log("Error na subscrible de consulta: ", err)
        }
      })

    this.form_cadatro_exame.get('hora_do_exame')?.setValue(`${this.min_date_picker.getHours()}:${this.min_date_picker.getMinutes()}`)
  }


  onSubmit() {
    if(this.form_cadatro_exame.valid){
      if(this.edit_mode){
        const exame: Exame = {
          data_do_exame: this.form_cadatro_exame.get('data_do_exame')?.value,
          nome_do_exame: this.form_cadatro_exame.get('nome_do_exame')?.value,
          hora_do_exame: this.form_cadatro_exame.get('hora_do_exame')?.value,
          laboratorio: this.form_cadatro_exame.get('laboratorio')?.value,
          tipo_do_exame: this.form_cadatro_exame.get('tipo_do_exame')?.value,
          url_do_documento_do_exame: this.form_cadatro_exame.get('url_do_exame')?.value,
          resultado_do_exame: this.form_cadatro_exame.get('resultado_do_exame')?.value,
          pacienteId: this.paciente_selected.id!,
          id: this.id
        }
  
        this.api_backend.putExame(exame).subscribe({next: value => {
          this.frase_apos_submit = 'edit_exam'
        }, error: err => {
          this.frase_apos_submit = 'error'
        }})
  
      } else {
        const exame: Exame = {
          data_do_exame: this.form_cadatro_exame.get('data_do_exame')?.value,
          nome_do_exame: this.form_cadatro_exame.get('nome_do_exame')?.value,
          hora_do_exame: this.form_cadatro_exame.get('hora_do_exame')?.value,
          laboratorio: this.form_cadatro_exame.get('laboratorio')?.value,
          tipo_do_exame: this.form_cadatro_exame.get('tipo_do_exame')?.value,
          url_do_documento_do_exame: this.form_cadatro_exame.get('url_do_exame')?.value,
          resultado_do_exame: this.form_cadatro_exame.get('resultado_do_exame')?.value,
          pacienteId: this.paciente_selected.id!,
          id: null
        }
  
        this.api_backend.postNewExame(exame).subscribe({next: value => {
          this.frase_apos_submit = 'new_exam'
        }, error: err => {
          this.frase_apos_submit = 'error'
        }})
      }
    
    } else {
      this.form_cadatro_exame.markAllAsTouched()
    }
  }


  setFormToEdit(exame: Exame) {
    this.form_cadatro_exame.patchValue({
      nome_do_exame: exame.nome_do_exame,
      data_do_exame: new Date(exame.data_do_exame),
      hora_do_exame: exame.hora_do_exame,
      tipo_do_exame: exame.tipo_do_exame,
      laboratorio: exame.laboratorio,
      url_do_exame: exame.url_do_documento_do_exame,
      resultado_do_exame: exame.resultado_do_exame,
    })
  }

  paciente_is_selected(paciente: Pacientes) {
    this.paciente_selected = paciente
    this.edit_mode = false
    // ja esta ocorendo na pipe
    // this.form_cadatro_consulta.get('switch_edit')?.disable()
  }

  deleteExam() {
    this.api_backend.deleteExame(this.id).subscribe({next: value => {
      this.frase_apos_submit = 'delete_exam'
    }, error: err => {
      this.frase_apos_submit = 'error'
    }})
  }

  getErrorMessageNomeDoExame() {
    if (this.form_cadatro_exame.get('nome_do_exame')?.hasError('required')) {
      return 'Nome do Exame é Obrigatorio';
    }

    return (this.form_cadatro_exame.get('nome_do_exame')?.hasError('minlength') || this.form_cadatro_exame.get('nome_do_exame')?.hasError('maxlength')) ? 'Exame deve ter entre 8 a 64 caracteres' : '';
  }

  getErrorMessageDatePicker() {
    return this.form_cadatro_exame.get('data_do_exame')?.hasError('required') ? 'Data do Exame Obrigatoria' : '';
  }

  getErrorMessageDateTime() {
    return this.form_cadatro_exame.get('hora_do_exame')?.hasError('required') ? 'Hora do Exame Obrigatoria' : '';
  }

  getErrorMessageTipoDoExame() {
    if (this.form_cadatro_exame.get('tipo_do_exame')?.hasError('required')) {
      return 'Exame é Obrigatorio';
    }

    return (this.form_cadatro_exame.get('tipo_do_exame')?.hasError('minlength') || this.form_cadatro_exame.get('tipo_do_exame')?.hasError('maxlength')) ? 'Exame deve ter entre 4 a 32 caracteres' : '';
  }

  getErrorMessageLaboratorio() {
    if (this.form_cadatro_exame.get('laboratorio')?.hasError('required')) {
      return 'Laboratorio é Obrigatorio';
    }

    return (this.form_cadatro_exame.get('laboratorio')?.hasError('minlength') || this.form_cadatro_exame.get('laboratorio')?.hasError('maxlength')) ? 'Laboratorio deve ter entre 4 a 32 caracteres' : '';
  }

  getErrorMessageResultado() {
    if (this.form_cadatro_exame.get('resultado_do_exame')?.hasError('required')) {
      return 'Resultado do exame é Obrigatorio';
    }

    return (this.form_cadatro_exame.get('resultado_do_exame')?.hasError('minlength') || this.form_cadatro_exame.get('resultado_do_exame')?.hasError('maxlength')) ? 'Resultado do exame deve ter entre 16 a 1024 caracteres' : '';
  }

  getIfFormIsDirtyOrTouched(control: string) {
    return this.form_cadatro_exame.controls[control].invalid && (this.form_cadatro_exame.controls[control].dirty || this.form_cadatro_exame.controls[control].touched)
  }

}
