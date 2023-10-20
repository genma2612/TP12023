import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Servicios/user-auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  resultados?: any[];

  dtOptions: DataTables.Settings = {};

  constructor(private userAuth: UserAuthService) {
    this.userAuth.traerColeccionOrdenada('resultados', 'fecha').subscribe(
      data => {
        this.resultados = data;
    }
    )
  }




  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [ [20, 50, 100, -1], [20, 50, 100, "Todas"] ],
      language: {
        "emptyTable":     "No hay información para mostrar",
        "info":           "Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ filas",
        "infoEmpty":      "Mostrando 0 a 0 de 0 entries",
        "infoFiltered":   "(Filtrado de _MAX_ entradas totales)",
        "lengthMenu":     "Mostrar _MENU_ filas",
        "loadingRecords": "Cargando...",
        "search":         "Buscar:",
        "zeroRecords":    "No se encontraron coincidencias",
        "paginate": {
            "first":      "Primera",
            "last":       "Última",
            "next":       "Siguiente",
            "previous":   "Anterior"
        },
        "aria": {
            "sortAscending":  ": activate to sort column ascending",
            "sortDescending": ": activate to sort column descending"
        }
    }
    };
    
  }

}
