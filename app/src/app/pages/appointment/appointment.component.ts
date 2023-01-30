import { Component } from '@angular/core';
import { Pacientes } from 'src/app/shared/interfaces/paciente';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {

  disabled:boolean = true

  constructor(){}



  paciente_is_selected(paciente: Pacientes){
    console.log(paciente)
  }

}
