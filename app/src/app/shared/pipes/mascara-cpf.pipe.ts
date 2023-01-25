import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mascaraCpf',
  pure: false
})
export class MascaraCpfPipe implements PipeTransform {

  transform(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
  }


}
