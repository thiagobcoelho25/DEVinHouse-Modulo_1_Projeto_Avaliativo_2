import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViaApiService {

  constructor(private httpClient: HttpClient) { }


  getCepApi(url: string){
    return this.httpClient.get(`https://viacep.com.br/ws/${url}/json/`);
  }

  // EXEMPLO API VIACEP
  // {
  //   "cep": "01001-000",
  //   "logradouro": "Praça da Sé",
  //   "complemento": "lado ímpar",
  //   "bairro": "Sé",
  //   "localidade": "São Paulo",
  //   "uf": "SP",
  //   "ibge": "3550308",
  //   "gia": "1004",
  //   "ddd": "11",
  //   "siafi": "7107"
  // }
}
