import { Component } from '@angular/core';

@Component({
  selector: 'app-list-medical-record',
  templateUrl: './list-medical-record.component.html',
  styleUrls: ['./list-medical-record.component.css']
})
export class ListMedicalRecordComponent {



  termFilter(term: string){
    console.log(term)
  }

}
