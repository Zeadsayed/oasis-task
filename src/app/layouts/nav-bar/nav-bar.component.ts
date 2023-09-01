import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccess } from 'src/app/shared/models/iuser';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  cartProducts: any[] = [];
  total: number = 0;
  isLogin: boolean = false;

  searchTerm: string = ''
  constructor(
    private service: ProductsService,
    private auth: AuthService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    // check if user login to show nav
    this.auth.userData.subscribe(() => {
      if (this.auth.userData.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    })

  }

  getCartProducts() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      this.total = this.cartProducts.length;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);


  }
}
