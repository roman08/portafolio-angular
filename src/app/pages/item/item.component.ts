import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDetalle } from '../../interfaces/productoDetalle.interfaces';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDetalle;
  id: string;

  constructor( private route: ActivatedRoute, public _producto: ProductosService) { }

  ngOnInit() {
    this.route.params.subscribe( parametros => {
      this._producto.getProducto(parametros['id'])
        .subscribe( (producto: ProductoDetalle) => {
          this.producto = producto;
          this.id = parametros['id'];
        });
    })
  }

}
