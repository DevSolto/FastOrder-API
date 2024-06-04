
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { OrderItemsController } from "../controllers/orderItemsController";

const router = Router()
const orderItemsController = new OrderItemsController()

router.get("/items", async (req, res) => {
    return await orderItemsController.getAll(req, res)
})

router.get("/:orderId/items/:productId", async (req, res) => {
    return await orderItemsController.getById(req, res)
})

router.get("/:orderId/items", async (req, res) => {
    return await orderItemsController.getItemsByOrderId(req, res)
})

router.post("/items", async (req, res) => {
    return await orderItemsController.create(req, res)
})

router.put("/:orderId/items/:productId", async (req, res) => {
    return await orderItemsController.updateById(req, res)
})

router.delete("/:orderId/items/:productId", async (req, res) => {
    return await orderItemsController.deleteById(req, res)

})

export default router