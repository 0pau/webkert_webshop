import { BillingAddress } from "./BillingAddress";

export interface UserData {
    billingAddresses: BillingAddress[];
    firstName: string;
    lastName: string;
}