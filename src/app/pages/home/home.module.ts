import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsItemsComponent } from './products/products-items/products-items.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProdcutDetailsComponent } from './prodcut-details/prodcut-details.component';
import { CartComponent } from './cart/cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    ProductsItemsComponent,
    ProductsComponent,
    ProdcutDetailsComponent,
    CartComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    SharedModule,
    NgxSpinnerModule,

  ]
})
export class HomeModule { }
