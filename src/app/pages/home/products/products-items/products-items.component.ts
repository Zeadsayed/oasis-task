import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products-items',
  templateUrl: './products-items.component.html',
  styleUrls: ['./products-items.component.css']
})
export class ProductsItemsComponent implements OnInit {
  @Input() data!:Product

  @Output() item = new EventEmitter();
  addButton:boolean = false;
  amount:number = 0

  searchKey:string=''

  constructor(private ProductsService: ProductsService) { }

  ngOnInit(): void {
    // this.ProductsService.search.subscribe(val => {
    //   this.searchKey = val
    // })

  }

  add() {
    this.item.emit({item:this.data, quantity:this.amount = 1 })
  }
}
