export class ProductNameIsBeingUsed extends Error {
    constructor(productName:string){
        super(`The product name ${productName} is already in use.`)
        this.name = "Product Name Already InUseError"
    }
}

export class ProductNotFound extends Error{
    constructor(){
        super(`Product not found`)
        this.name = "ProductNotFound"
    }
}