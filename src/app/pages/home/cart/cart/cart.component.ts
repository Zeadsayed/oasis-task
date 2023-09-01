import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(
    private CartService: CartService,
    public message: MessagesService,
    ) { }

  cartProducts: any[] = [];

  total: number = 0;

  ngOnInit(): void {

    this.getCartProducts()
  }

  getCartProducts() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal()
  }

  addAmount(index: number) {
    this.cartProducts[index].quantity++
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  minsAmount(index: number) {
    this.cartProducts[index].quantity--
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
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
    if(this.cartProducts.length == 0){
      this.message.toast("No Products In Your Cart", "error");
    }else{
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

  addCart() {
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
      if (products.length == 0) {

        this.message.toast("No Products In Your Cart", "error");
      }
      else {
        this.message.popup("Well done! Your Order is Successfully Send", "success method");
        this.clearCart()

      }
    })
  }
}
