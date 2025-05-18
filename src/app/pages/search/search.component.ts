import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/Product';
import {Condition} from '../../model/Condition';
import {ProductCardComponent} from '../../views/product-card/product-card.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [
    ProductCardComponent,
    NgForOf
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  protected queryString:string|null = null;
  protected products: Product[] = [];

  constructor(private route: ActivatedRoute, private productService : ProductService) {
  }

  ngDoCheck() {

    let oldQ = this.queryString;
    this.queryString = this.route.snapshot.paramMap.get("keyword");

    if (oldQ != this.queryString) {
      this.getItems();
    }
  }

  getItems() {
    let qs = this.queryString!.toLowerCase();
    let conditions:Condition[] = [];
    if (qs.includes("category:")) {
      let category = qs.replace("category:", "");
      conditions = [
        {leftOperand: "category", operator: "==", rightOperand: category} as Condition
      ];
    } else {
      conditions = [
        {leftOperand: "lowercase_name", operator: ">=", rightOperand: qs} as Condition,
        {leftOperand: "lowercase_name", operator: "<=", rightOperand: qs+"~"} as Condition
      ]
    }
    this.productService.getProducts(conditions).subscribe(list=>{
      this.products = list;
      console.log(this.products);
    });
  }
}
