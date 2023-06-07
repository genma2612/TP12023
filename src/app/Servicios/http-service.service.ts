import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private url = 'https://api.github.com/users/genma2612';

  constructor(private httpClient: HttpClient) { }


  traerInfoGithub(){
    return this.httpClient.get(this.url);
  }
  
}
