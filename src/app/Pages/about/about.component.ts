import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/Servicios/http-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  infoGithub:any;

  constructor(private service:HttpServiceService) { }

  ngOnInit(): void {
    this.service.traerInfoGithub().subscribe(response => {this.infoGithub = response;});
  }

  irAPagina(){
    location.href = this.infoGithub.html_url;
  }

  ngOnDestroy(): void {
  }

}
