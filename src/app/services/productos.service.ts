import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: Producto[] = [];
  cargando: boolean = true;
  constructor( private http: HttpClient) {
    this.cargatProductos();
   }


  private cargatProductos() {
    this.http.get('https://angular-html-f1557.firebaseio.com/productos_idx.json')
      .subscribe( (respo: Producto[] ) => {
        this.productos = respo;
        setTimeout(() => {
          this.cargando = false;
        },1000);
        
        console.log(this.productos);
      })
  }
}
