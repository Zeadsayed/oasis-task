import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products-items',
  templateUrl: './products-items.component.html',
  styleUrls: ['./products-items.component.css']
})
export class ProductsItemsComponent implements OnInit {
  @Input() data!: Product

  @Output() item = new EventEmitter();

  amount: number = 0

  constructor(private ProductsService: ProductsService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  add() {
    this.item.emit({ item: this.data, quantity: this.amount = 1 })
  }
}
