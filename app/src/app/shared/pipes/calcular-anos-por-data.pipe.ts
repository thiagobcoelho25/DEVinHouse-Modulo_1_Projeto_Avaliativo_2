import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcularAnosPorData'
})
export class CalcularAnosPorDataPipe implements PipeTransform {

  transform(data: string): string {
    const ano_data_paciente = +data.split('/')[2]
    const ano_atual = new Date().getFullYear()

    let anos_paciente = ano_atual - ano_data_paciente

    return anos_paciente.toString()
  }

}
