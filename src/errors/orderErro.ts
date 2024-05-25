
export class OrderNotFound extends Error{
    constructor(){
        super(`Order not found`)
        this.name = "OrderNotFound"
    }
}