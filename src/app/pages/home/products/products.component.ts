import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/shared/models/product';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  categories: string[] = [];
  cartProducts: any[] = []

  searchKey: string = ''

  constructor(
    public ProductsService: ProductsService,
    public message: MessagesService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }

  getProducts() {
    this.spinner.show();
    this.ProductsService.getAllProducts().subscribe((res: any) => {
      this.products = res
      this.spinner.hide();
    })
  }

  getCategories() {
    this.ProductsService.getAllCategories().subscribe((res: any) => {
      this.categories = res
    })
  }

  filterCategory(event: any) {
    let value = event.target.value;
    if (value == "all") {
      this.getProducts();
    } else {
      this.getProductsCategory(value);
    }
  }

  getProductsCategory(keyword: string) {
    this.spinner.show();
    this.ProductsService.getProductsByCategory(keyword).subscribe((res: any) => {
      this.spinner.hide();
      this.products = res
    })
  }

  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if (exist) {
        this.message.toast("Product is already in your cart", "error");
      } else {
        this.cartProducts.push(event)
        this.message.toast("Product is Added Successfully", "success");
        localStorage.setItem("cart", JSON.stringify(this.cartProducts))
      }
    } else {
      this.cartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    }
  }

}
