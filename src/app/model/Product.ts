export class Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    manufacturer: string | undefined;
    addDate: Date | undefined;
    properties: Map<string, Map<string,string>> | undefined;


  constructor(id: string, name: string, description: string, image: string, price: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
  }
}
