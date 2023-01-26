import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { delay } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { ViaApiService } from 'src/app/services/via-api.service';
import { Cep } from 'src/app/shared/interfaces/cep';
import { Pacientes } from 'src/app/shared/interfaces/paciente';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  id!: number
  registration_edit_form!: FormGroup
  edit_mode: boolean = false

  buscando_endereco_api: boolean = false
  erro_buscando_endereco_api: boolean = false
  erro_cep_nao_valido: boolean = false

  frase_apos_submit: string | null = null
  carregando_form: boolean = false

  constructor(private via_api_service: ViaApiService, private activatedRoute: ActivatedRoute, private router: Router, private api_backend: BackendService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.edit_mode = params['id'] != null
      this.initForm();
    })
  }


  initForm() {
    this.frase_apos_submit = null

    let array_contatos_emergencia = new FormArray<AbstractControl>([])
    let array_alergias = new FormArray<AbstractControl>([])

    this.registration_edit_form = new FormGroup({
      'switch_edit': new FormControl(false),
      'nome': new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(8)]),
      'genero': new FormControl('', Validators.required),
      'data': new FormControl('', [Validators.required, this.dateValidator]),
      'cpf': new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11), this.cpfValidator]),
      'rg': new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern("^[0-9]*$")]),
      'estado_civil': new FormControl('', Validators.required),
      'telefone': new FormControl('', [Validators.required, this.telefoneValidator]),
      'email': new FormControl(''),
      'convenio': new FormControl(''),
      'numero_carteira_covenio': new FormControl(''),
      'validade_carteira_covenio': new FormControl(''),
      'cep': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]/*, this.cepValidatorAsync.bind(this)*/),
      'cidade': new FormControl(''),
      'estado': new FormControl(''),
      'logradouro': new FormControl(''),
      'numero': new FormControl(''),
      'complemento': new FormControl(''),
      'bairro': new FormControl(''),
      'array_contatos_emergencia': array_contatos_emergencia,
      'array_alergias': array_alergias
    })

    if (this.edit_mode) {
      this.carregando_form = true

      this.api_backend.getPacienteById(this.id).pipe(delay(3000)).subscribe({
        next: paciente => {
          this.registration_edit_form.get('nome')?.setValue(paciente.nome)
          this.registration_edit_form.get('genero')?.setValue(paciente.genero)
          this.registration_edit_form.get('data')?.setValue(paciente.data)
          this.registration_edit_form.get('cpf')?.setValue(paciente.cpf)
          this.registration_edit_form.get('rg')?.setValue(paciente.rg)
          this.registration_edit_form.get('estado_civil')?.setValue(paciente.estado_civil)
          this.registration_edit_form.get('telefone')?.setValue(paciente.telefone)
          this.registration_edit_form.get('email')?.setValue(paciente.email)
          this.registration_edit_form.get('convenio')?.setValue(paciente.convenio)
          this.registration_edit_form.get('numero_carteira_covenio')?.setValue(paciente.numero_carteira_covenio)
          this.registration_edit_form.get('validade_carteira_covenio')?.setValue(paciente.validade_carteira_covenio)
          this.registration_edit_form.get('cep')?.setValue(paciente.cep)
          this.registration_edit_form.get('cidade')?.setValue(paciente.cidade)
          this.registration_edit_form.get('estado')?.setValue(paciente.estado)
          this.registration_edit_form.get('logradouro')?.setValue(paciente.logradouro)
          this.registration_edit_form.get('numero')?.setValue(paciente.numero)
          this.registration_edit_form.get('complemento')?.setValue(paciente.complemento)
          this.registration_edit_form.get('bairro')?.setValue(paciente.bairro)
          if (paciente.contatos_emergencia.length > 0) {
            paciente.contatos_emergencia.forEach(contato_emergencia => {
              array_contatos_emergencia.push(
                new FormGroup({
                  nome_contato_emergencia: new FormControl(contato_emergencia.nome_contato_emergencia, Validators.required),
                  numero_telefone_contato_emergencia: new FormControl(contato_emergencia.numero_telefone_contato_emergencia,[Validators.required, this.telefoneValidator])
                })
              )
            })
          }
          if (paciente.alergias.length > 0) {
            paciente.alergias.forEach(alergia => {
              array_alergias.push(
                new FormGroup({
                  tipo_alergia: new FormControl(alergia.tipo_alergia, Validators.required)
                })
              )
            })
          }
        }, error: error => {
          this.edit_mode = false
          this.frase_apos_submit = 'error'
          this.registration_edit_form.get('switch_edit')?.disable()
        }
      }).add(() => {
        this.carregando_form = false
      })
    } else {
      this.registration_edit_form.get('switch_edit')?.disable()
    }
  }

  onSubmit() {
    const paciente: Pacientes = {
      id: (this.id && this.edit_mode) ? this.id : null,
      nome: this.registration_edit_form.get('nome')?.value,
      genero: this.registration_edit_form.get('genero')?.value,
      data: this.registration_edit_form.get('data')?.value,
      cpf: this.registration_edit_form.get('cpf')?.value,
      rg: this.registration_edit_form.get('rg')?.value,
      estado_civil: this.registration_edit_form.get('estado_civil')?.value,
      telefone: this.registration_edit_form.get('telefone')?.value,
      email: this.registration_edit_form.get('email')?.value,
      contatos_emergencia: this.registration_edit_form.get('array_contatos_emergencia')?.value,
      convenio: this.registration_edit_form.get('convenio')?.value === null || "" ? "sem_plano" : this.registration_edit_form.get('convenio')?.value,
      numero_carteira_covenio: this.registration_edit_form.get('numero_carteira_covenio')?.value,
      validade_carteira_covenio: this.registration_edit_form.get('validade_carteira_covenio')?.value,
      alergias: this.registration_edit_form.get('array_alergias')?.value,
      cep: this.registration_edit_form.get('cep')?.value,
      cidade: this.registration_edit_form.get('cidade')?.value,
      estado: this.registration_edit_form.get('estado')?.value,
      logradouro: this.registration_edit_form.get('logradouro')?.value,
      numero: this.registration_edit_form.get('numero')?.value,
      complemento: this.registration_edit_form.get('complemento')?.value,
      bairro: this.registration_edit_form.get('bairro')?.value
    }


    if (!this.edit_mode && !this.erro_cep_nao_valido && !this.erro_buscando_endereco_api) {
      if (this.registration_edit_form.valid) {
        this.registration_edit_form.disable()
        this.carregando_form = true
        this.api_backend.postNewPaciente(paciente).pipe(delay(3000)).subscribe({
          next: data => {
            this.frase_apos_submit = 'new_user'
            this.erro_buscando_endereco_api = false
          },
          error: error => {
            this.frase_apos_submit = 'error'
            console.log(`ERROR NA API CRIAÇÃO: ${error}`)
          }
        }).add(() => {
          this.registration_edit_form.enable()
          if (!this.edit_mode) {
            this.registration_edit_form.get('switch_edit')?.disable()
          }
          this.carregando_form = false
        })

        this.erro_cep_nao_valido = false
      } else {
        this.registration_edit_form.markAllAsTouched()
        window.alert('Formulario não valido')
      }
    } else {

      if (this.registration_edit_form.valid && !this.erro_cep_nao_valido && !this.erro_buscando_endereco_api) {
        this.registration_edit_form.disable()
        this.carregando_form = true
        this.api_backend.putPaciente(paciente).pipe(delay(3000)).subscribe({
          next: data => {
            this.frase_apos_submit = 'edit_user'
            this.erro_buscando_endereco_api = false
          },
          error: error => {
            this.frase_apos_submit = 'error'
            console.log(`ERROR NA API: ${error}`)
          }
        }).add(() => {
          this.registration_edit_form.enable()
          if (!this.edit_mode) {
            this.registration_edit_form.get('switch_edit')?.disable()
          }
          this.carregando_form = false
        })

        this.erro_cep_nao_valido = false
      } else {
        this.registration_edit_form.markAllAsTouched()
        window.alert('Formulario não valido')
      }

    }

  }

  callViaApiAfterCompleteCep() {
    if ((<string>this.registration_edit_form.get('cep')?.value).length === 8) {

      this.registration_edit_form.disable()
      this.buscando_endereco_api = true
      this.erro_buscando_endereco_api = false
      this.erro_cep_nao_valido = false

      this.via_api_service.getCepApi(this.registration_edit_form.get('cep')?.value).pipe(delay(3000)).subscribe({
        next: data => {
          if (data.hasOwnProperty('erro')) {
            this.erro_cep_nao_valido = true
            this.registration_edit_form.get('cidade')?.setValue("")
            this.registration_edit_form.get('estado')?.setValue("")
            this.registration_edit_form.get('logradouro')?.setValue("")
            this.registration_edit_form.get('complemento')?.setValue("")
            this.registration_edit_form.get('bairro')?.setValue("")
            this.registration_edit_form.get('numero')?.setValue("")

          } else {
            const cep = data as Cep
            this.registration_edit_form.get('cidade')?.setValue(cep.localidade)
            this.registration_edit_form.get('estado')?.setValue(cep.uf)
            this.registration_edit_form.get('logradouro')?.setValue(cep.logradouro)
            this.registration_edit_form.get('complemento')?.setValue(cep.complemento)
            this.registration_edit_form.get('bairro')?.setValue(cep.bairro)
          }
        }, error: error => {
          console.log('tipo error do:', error)
          this.erro_buscando_endereco_api = true
        }
      }).add(() => {
        this.registration_edit_form.enable()
        if (!this.edit_mode) {
          this.registration_edit_form.get('switch_edit')?.disable()
        }
        this.buscando_endereco_api = false
      })
    }
  }

  get array_contatos_emergencia_controls() { // a getter!
    return (<FormArray>this.registration_edit_form.get('array_contatos_emergencia')).controls;
  }

  get array_alergias_controls() { // a getter!
    return (<FormArray>this.registration_edit_form.get('array_alergias')).controls;
  }

  onAddContatos_Emergencia() {
    (<FormArray>this.registration_edit_form.get('array_contatos_emergencia')).push(new FormGroup({
      nome_contato_emergencia: new FormControl('', Validators.required),
      numero_telefone_contato_emergencia: new FormControl('', [Validators.required, this.telefoneValidator])
    }))
  }

  onAddAlergias() {
    console.log('add alergia');
    (<FormArray>this.registration_edit_form.get('array_alergias')).push(new FormGroup({
      tipo_alergia: new FormControl('', Validators.required)
    }))
  }

  onDeleteContatos_Emergencia(index: number) {
    (<FormArray>this.registration_edit_form.get('array_contatos_emergencia')).removeAt(index)
  }

  onDeleteAlergias(index: number) {
    (<FormArray>this.registration_edit_form.get('array_alergias')).removeAt(index)
  }

  retornoControleByIndexTelefoneContatoEmergencia(index: number){
    return (<FormArray<FormGroup>>this.registration_edit_form.get('array_contatos_emergencia')).at(index)
    // .controls['numero_telefone_contato_emergencia'].errors?.['invalidTelefone']
  }

  dateValidator(c: AbstractControl): ValidationErrors | null {
    let value = c.value;
    if (value && typeof value === "string") {
      let match = value.match(/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g);
      if (!match) {
        return { 'dateInvalid': true };
      } else if (match && match[0] !== value) {
        return { 'dateInvalid': true };
      }
    }
    return null;
  }

  cpfValidator(c: AbstractControl): ValidationErrors | null {
    let value: string = c.value
    let match = (value.match(/^\d{11}$/))
    if (!match) {
      return { 'invalidCpf': true };
    }
    return null
  }

  // RegEx para (99) 9 9999-99999
  telefoneValidator(c: AbstractControl): ValidationErrors | null {
    let value:string = c.value;
    let match = (value.match(/^(?:\()[0-9]{2}(?:\))\s?[0-9]{1}\s?[0-9]{4}(?:-)[0-9]{5}$/))
    if (!match) {
      return { 'invalidTelefone': true };
    }
    return null
  }

  // -------------------------------------- ERROS --------------------------------------------------------
  // Validação com AsyncValidator utilizando this.registration_edit_form, ou da undefined ou apresenta loop/reativação constante

  // cepValidatorAsync(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //   return of(control.value).pipe(
  //     map(value => {
  //       // this.registration_edit_form.disable()
  //       console.log('setando form disable')
  //       if(value === 'test@test.com'){
  //         // this.registration_edit_form.enable()
  //         console.log('setando form enable')
  //         return { 'emailIsForbidden': true }
  //       } else {
  //         console.log('setando form enable')
  //         // this.registration_edit_form.enable()
  //         return null
  //       }
  //     }),
  //     delay(3000)
  //   );
  // }

  // cepValidatorAsync(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //   this.registration_edit_form.disable()
  //   console.log('pedding setado true')
  //   return new Observable<any>(observer => {
  //     setTimeout(() => {
  //       const email = control.value ? control.value.toLowerCase() : '';
  //       if (email === '11111111') {
  //         console.log('validacao correta')
  //         this.registration_edit_form.enable()
  //         observer.next({forbiddenEmail: true});
  //       } else {
  //         console.log('validacao falsa')
  //         this.registration_edit_form.enable()
  //         observer.next(null);
  //       }
  //       observer.complete();
  //     }, 5000);
  //   });
  // }


  // cepValidatorAsync = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //     console.log('setando form disable')
  //     this.registration_edit_form.disable()
  //     const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
  //       setTimeout(() => {
  //         if (control.value === 'TEST') {
  //           console.log('setando form enable')
  //           resolve({'duplicated': true});
  //         } else {
  //           console.log('setando form enable')
  //           this.registration_edit_form.enable()
  //           resolve(null);
  //         }
  //       }, 3000);
  //     });
  //     return promise;
  // }


}
