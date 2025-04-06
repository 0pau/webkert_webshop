export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    manufacturer: string;
    addDate: Date;
    properties: Map<string, Map<string,string>>
}