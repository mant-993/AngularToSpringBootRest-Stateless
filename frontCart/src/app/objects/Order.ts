import { Product } from "./Product";

export class Order{

    constructor(productList : Product[], username : string){ 
        this.productList = productList
        this.username = username
    }

    productList : Product[];
    totalPrice : number | null = null;
    placedAt : Date | null = null;
    username : string;

}