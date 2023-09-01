import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProdcutDetailsComponent } from './prodcut-details/prodcut-details.component';
import { CartComponent } from './cart/cart/cart.component';

const routes: Routes = [
  {path:"products", component:ProductsComponent},

  {path:"product-details/:id", component:ProdcutDetailsComponent},

  {path:'cart' , component:CartComponent},

  {path:'search/searchTerm' , component:ProdcutDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
