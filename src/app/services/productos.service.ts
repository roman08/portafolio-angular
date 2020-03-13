import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: Producto[] = [];
  cargando: boolean = true;
  productosFiltrado: Producto[] = [];
  constructor( private http: HttpClient) {
    this.cargatProductos();
   }


  private cargatProductos() {
    return new Promise( (resolve, reject) => {
      this.http.get('https://angular-html-f1557.firebaseio.com/productos_idx.json')
      .subscribe( (respo: Producto[] ) => {
        this.productos = respo;
        this.cargando = false;
        resolve();
      });
    });

  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-f1557.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto( term: string) {
    if( this.productos.length === 0) {
      this.cargatProductos().then( () => {
        this.filtrarProductos( term);
      });
    } else{
      this.filtrarProductos( term);
    }
  }

  private filtrarProductos( term: string) {
    this.productosFiltrado = [];
    term = term.toLocaleLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf( term ) >= 0 || tituloLower.indexOf(term) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
