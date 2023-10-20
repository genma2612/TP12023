import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasAPIService {

  //parametros = new HttpParams().set('types', 'image_choice').set('limit', 10);

  parametros = new HttpParams().set('limit', 10);


  private urlPaises = "https://restcountries.com/v3.1/alpha?codes=";
  listaCCA2 = [
    "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB",
    "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV", "BR", "IO", "VG", "BN", "BG", "BF", "BI", "KH", "CM", "CA",
    "CV", "BQ", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK",
    "DJ", "DM", "DO", "CD", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF",
    "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "HN", "HK",
    "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "XK", "KW", "KG",
    "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU",
    "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG",
    "NU", "NF", "KP", "MK", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA",
    "CG", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL",
    "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "KR", "SS", "ES", "LK", "SD", "SR", "SJ", "SE", "CH", "SY", "TW", "TJ",
    "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "VI", "UY",
    "UZ", "VU", "VA", "VE", "VN", "WF", "EH", "YE", "ZM", "ZW"];
  cantidadPreguntas = 10;
  cantidadPaises = this.cantidadPreguntas * 4;
  preguntasRequest: any;
  arrayPreguntas: any[] = [];

  options = { params: new HttpParams().set('types', 'image_choice') };

  constructor(private httpClient: HttpClient) {
  }

  getQuestions() {
    //return this.httpClient.get('https://the-trivia-api.com/v2/questions');
    return this.httpClient.get('https://the-trivia-api.com/v2/questions', { 'params': this.parametros });
  }

  traerPaises(codigoPaises: string) {
    return this.httpClient.get(this.urlPaises + codigoPaises);
  }

  traerPaisesTest(codigoPaises: string) {
    return this.httpClient.get(this.urlPaises + codigoPaises);
  }

  generarListadoRandom() {
    let retorno = '';
    let listaTemp = this.listaCCA2;
    for (let index = 0; index < this.cantidadPaises; index++) {
      retorno += listaTemp.splice(Math.floor(Math.random() * listaTemp.length), 1)
      if (index < this.cantidadPaises-1)
        retorno += ',';
    }
    return retorno;
  }

  generarPreguntas() {
    this.arrayPreguntas = [];
    let objTemp;
    this.traerPaises(this.generarListadoRandom()).pipe(first()).subscribe(
      respose => {
        this.preguntasRequest = respose as Array<any>;
        for (let index = 0; index < this.cantidadPreguntas; index++) {
          let pregunta = {
            pregunta: "",
            respuestas: [
              { correcta: true, option: "" },
              { correcta: false, option: "" },
              { correcta: false, option: "" },
              { correcta: false, option: "" }
            ]
          };
          objTemp = this.preguntasRequest.shift();
          pregunta.pregunta = objTemp.translations.spa.common;
          pregunta.respuestas[0].option = objTemp.flags.svg;
          for (let index = 1; index < 4; index++) {
            objTemp = this.preguntasRequest.shift()
            pregunta.respuestas[index].option = objTemp.flags.svg;
          }
          pregunta.respuestas = this.mezclarRespuestas(pregunta.respuestas);
          this.arrayPreguntas.push(pregunta);
          objTemp = null;

        }
      }
    )
    //console.info(this.arrayPreguntas);
    //console.info(this.getPreguntasPaises());
    //return this.arrayPreguntas;
  }

  getPreguntasPaises(){
    return this.arrayPreguntas;
  }

  mezclarRespuestas(array: any[]) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

}
