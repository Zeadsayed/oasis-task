import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  cartProducts: any[] = [];
  total: number = 0;

  constructor(
    public auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {}

  getCartProducts() {
    this.spinner.show();
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      this.total = this.cartProducts.length;
    this.spinner.hide();

    }
  }

  logout() {
    this.spinner.show();
    this.auth.logout();
    this.router.navigate(['login']);
    this.spinner.hide();
  }

}
