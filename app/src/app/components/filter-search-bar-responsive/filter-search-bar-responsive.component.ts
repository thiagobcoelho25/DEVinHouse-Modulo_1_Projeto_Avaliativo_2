import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BackendService } from 'src/app/services/backend.service';
import { Pacientes } from 'src/app/shared/interfaces/paciente';

@Component({
  selector: 'app-filter-search-bar-responsive',
  templateUrl: './filter-search-bar-responsive.component.html',
  styleUrls: ['./filter-search-bar-responsive.component.scss']
})
export class FilterSearchBarResponsiveComponent {
  
  lista_pacientes: Pacientes[] = []
  lista_pacientes_filtrada: Pacientes[] = []
  input_search: FormControl

  @Output()
  emitir_paciente_selecionado: EventEmitter<Pacientes> = new EventEmitter();

  @Input()
  is_disabled: boolean = true

  constructor(private backend_service: BackendService){
    this.backend_service.getPacientes().subscribe({next: value => {
      this.lista_pacientes = value
      this.lista_pacientes_filtrada = value
    }, error: err => {
      
    },})

    this.input_search = new FormControl('');
  }


  filtrar_lista_pacientes(){
    const term = this.input_search.value ?  this.input_search.value : ""
    this.lista_pacientes_filtrada = this.lista_pacientes.filter(elem => elem.nome.toLocaleLowerCase().includes(term.toLocaleLowerCase())).slice(0, 3);
  }


  user_selected(valor: MatAutocompleteSelectedEvent){
    const id = valor.option.value
    const paciente: Pacientes = this.lista_pacientes.find(ele => ele.id = id)!
    this.emitir_paciente_selecionado.emit(paciente)
  }

  display_nome(paciente: Pacientes): string{
    return paciente && paciente.nome ? paciente.nome : ""
  }
}
