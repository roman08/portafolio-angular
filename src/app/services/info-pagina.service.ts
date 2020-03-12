import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';
import { Equipo } from '../interfaces/equipo.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: Equipo = {};

  constructor( private http: HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();

  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
    });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-f1557.firebaseio.com/equipo.json')
      .subscribe( (resp: Equipo )=> {
        this.equipo = resp;
        console.log(this.equipo);
      })
  }
}
