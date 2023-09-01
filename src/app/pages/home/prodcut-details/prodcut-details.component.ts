import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-prodcut-details',
  templateUrl: './prodcut-details.component.html',
  styleUrls: ['./prodcut-details.component.css']
})
export class ProdcutDetailsComponent implements OnInit {

  id:any
  data:any = {}
  constructor(private route:ActivatedRoute , private service:ProductsService) {
   this.id = this.route.snapshot.paramMap.get("id")
   console.log(this.id)
  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.service.getProductById(this.id).subscribe(res => {
      this.data = res
    })
  }
}
