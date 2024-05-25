
export class OrderItemsNotFound extends Error{
    constructor(){
        super(`Order not found`)
        this.name = "OrderNotFound"
    }
}