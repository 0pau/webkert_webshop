import {SpecProperty} from './SpecProperty';
import {ProductReview} from './ProductReview';

export class Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    manufacturer: string | undefined;
    addDate: number | undefined;
    discount: number = 0;
    quantity: number = 4;
    properties: Map<string, SpecProperty> | undefined;

    reviews: ProductReview[] = [];


  constructor(id: string, name: string, description: string, image: string, price: number, addDate = 0, discount = 0, properties: Map<string, SpecProperty> = new Map) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.addDate = addDate;
    this.discount = discount;
    this.properties = properties;
  }

  loadReviews() {
    this.reviews =  [
      {name: "Teszt felhasználó", text: "Teszt vélemény", value: 5, product: "?", date: new Date()},
      {name: "Teszt2", text: "Teszt vélemény 2", value: 2, product: "?", date: new Date()}
    ];
  }

  getReviews() : ProductReview[] {
    return this.reviews;
  }

  getRating() {
    let sum = 0;
    for (let r of this.reviews) {
      sum += r.value;
    }
    return sum/this.reviews.length;
  }

}
