export class BillingAddress {
    address: string;
    city: string;
    country: string;
    name: string;
    phone: string;
    postalCode: number;
    primary: boolean;


  constructor(address: string, city: string, country: string, name: string, phone: string, postalCode: number, primary: boolean) {
    this.address = address;
    this.city = city;
    this.country = country;
    this.name = name;
    this.phone = phone;
    this.postalCode = postalCode;
    this.primary = primary;
  }
}
