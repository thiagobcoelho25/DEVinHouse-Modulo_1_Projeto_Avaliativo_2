import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnDestroy{
  
  titulo_cabecalho: string
  nome_usuario: string
  routeSubscription: Subscription;

  constructor(private router: Router, private login_service: LoginServiceService){
    this.titulo_cabecalho = this.retornarTitutloCabeçalho(router.url.split("/")[1])
    this.routeSubscription = this.router.events
    .pipe(
      filter(event => event instanceof NavigationStart),
      map(event => event as NavigationStart),  // appease typescript
    ).subscribe(
      event => {
        this.titulo_cabecalho = this.retornarTitutloCabeçalho(event.url.split("/")[1])
      }
    );

    const token_object = JSON.parse(this.login_service.getToken()!)

    this.nome_usuario = token_object['nome']
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }

  retornarTitutloCabeçalho(rota: string): string {
    const urls_to_titulos: any = {
      'home': "ESTATÍSTICAS E INFORMAÇÕES",
      'registration': "CADASTRO DE PACIENTE",
      'list_medical_record': "LISTAGEM DE PRONTUÁRIOS",
      'medical_record': "PRONTUÁRIO DE PACIENTE",
      'registration_medical_appointment': "CADASTRO DE CONSULTA",
      'registration_medical_exam': "CADASTRO DE EXAME",
      '': "ESTATÍSTICAS E INFORMAÇÕES"
    }
    
    if(urls_to_titulos.hasOwnProperty(rota)){
      return urls_to_titulos[rota]
    } else {
      return "ESTATÍSTICAS E INFORMAÇÕES"
    } 
  }



}
