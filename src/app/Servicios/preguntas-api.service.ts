import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PreguntasAPIService {

  //parametros = new HttpParams().set('types', 'image_choice').set('limit', 10);

  parametros = new HttpParams().set('limit', 10);


  options = { params: new HttpParams().set('types', 'image_choice') };

  constructor(private httpClient: HttpClient) {
  }

  getQuestions() {
    //return this.httpClient.get('https://the-trivia-api.com/v2/questions');
    return this.httpClient.get('https://the-trivia-api.com/v2/questions', { 'params': this.parametros });
  }

}
