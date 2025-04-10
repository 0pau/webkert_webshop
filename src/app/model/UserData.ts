import { BillingAddress } from "./BillingAddress";

export class UserData {
    billingAddresses: BillingAddress[] = [];
    firstName: string;
    lastName: string;


  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
