import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/shared/services/cart.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private CartService: CartService,
    public message: MessagesService,
    private spinner: NgxSpinnerService
  ) { }

  cartProducts: any[] = [];

  total: number = 0;

  ngOnInit(): void {

    this.getCartProducts()
  }

  getCartProducts() {
    this.spinner.show();
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.spinner.hide();
    this.getCartTotal()
  }

  // detectChange in input
  detectChange() {
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1)
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  clearCart() {
    if (this.cartProducts.length == 0) {
      this.message.toast("No Products In Your Cart", "error");
    } else {
      this.cartProducts = []
      this.getCartTotal()
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    }

  }

  getCartTotal() {
    this.total = 0
    for (let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  CheckOut() {
    this.spinner.show();
    let products = this.cartProducts.map(item => {
      return {
        productId: item.item.id,
        quantity: item.quantity
      }
    })
    let Model = {
      userId: 5,
      date: new Date(),
      products: products
    }
    this.CartService.addCart(Model).subscribe(res => {
      this.spinner.hide();
      if (products.length == 0) {
        this.message.toast("No Products In Your Cart", "error");
      }
      else {
        this.spinner.hide();
        this.message.popup("Well done! Your Order is Successfully Send", "success method");
        this.clearCart()
      }
    })
  }
}
