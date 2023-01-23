import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { catchError, delay, map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ViaApiService } from 'src/app/services/via-api.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registration_edit_form!: FormGroup
  edit_mode!: boolean


  constructor(private via_api_service: ViaApiService){

  }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    let nome = ''
    let array_contatos_emergencia = new FormArray<AbstractControl>([])
    let array_alergias = new FormArray<AbstractControl>([])

    if(this.edit_mode){

    }

    this.registration_edit_form = new FormGroup({
      'nome': new FormControl(nome, Validators.required),
      'genero': new FormControl('', Validators.required),
      'data': new FormControl('', Validators.required),
      'cpf': new FormControl('', Validators.required),
      'rg': new FormControl('', Validators.required, ),
      'estado_civil': new FormControl('', Validators.required),
      'telefone': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),  
      'convenio': new FormControl('', [Validators.required]),
      'numero_carteira_covenio': new FormControl('', Validators.required),
      'validade_carteira_covenio': new FormControl('', Validators.required),
      'cep': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]/*, this.cepValidatorAsync.bind(this)*/),
      'cidade': new FormControl('', Validators.required, ),
      'estado': new FormControl('', Validators.required),
      'logradouro': new FormControl('', Validators.required),
      'numero': new FormControl('', Validators.required),
      'complemento': new FormControl(''),
      'bairro': new FormControl('', Validators.required),
      'array_contatos_emergencia': array_contatos_emergencia,
      'array_alergias': array_alergias
    })
  }


  onSubmit(){
    console.log('teste de subimit form')
  }

  callViaApiAfterCompleteCep(){
    if((<string>this.registration_edit_form.get('cep')?.value).length === 8){
      console.log('valido')
      this.registration_edit_form.disable()
      setTimeout(() => {
        this.registration_edit_form.enable()
      }, 3000)
    }
  }

  get array_contatos_emergencia_controls() { // a getter!
    return (<FormArray>this.registration_edit_form.get('array_contatos_emergencia')).controls;
  }

  get array_alergias_controls() { // a getter!
    return (<FormArray>this.registration_edit_form.get('array_alergias')).controls;
  }

  onAddContatos_Emergencia(){
    (<FormArray>this.registration_edit_form.get('array_contatos_emergencia')).push(new FormGroup({
      nome_contato_emergencia: new FormControl('', Validators.required),
      numero_telefone_contato_emergencia: new FormControl('', Validators.required)
    }))
  }

  onAddAlergias(){
    console.log('add alergia');
    (<FormArray>this.registration_edit_form.get('array_alergias')).push(new FormGroup({
      tipo_alergia: new FormControl('', Validators.required)
    }))
  }

  onDeleteContatos_Emergencia(index: number){
    (<FormArray>this.registration_edit_form.get('array_contatos_emergencia')).removeAt(index)
  }

  onDeleteAlergias(index: number){
    (<FormArray>this.registration_edit_form.get('array_alergias')).removeAt(index)
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
