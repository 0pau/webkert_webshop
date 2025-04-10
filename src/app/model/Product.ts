import {SpecProperty} from './SpecProperty';

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
}
