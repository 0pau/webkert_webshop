export class ProductReview {
    name: string;
    product: string;
    text: string;
    value: number;
    date: Date;


  constructor(name: string, product: string, text: string, value: number, date: Date) {
    this.name = name;
    this.product = product;
    this.text = text;
    this.value = value;
    this.date = date;
  }
}
