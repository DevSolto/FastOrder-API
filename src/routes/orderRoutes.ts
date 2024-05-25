
import { Router } from "express";
import { OrderController } from "../controllers/orderController"
import { PrismaClient } from "@prisma/client";

const router = Router()
const orderControler = new OrderController()

router.get("", async (req, res) => {
    return await orderControler.getAll(req, res)
})

router.post("", async (req, res) => {
    return await orderControler.create(req, res)
})

router.get("/:orderId", async (req, res) => {
    return await orderControler.getById(req, res)
})

router.put("/:orderId", async (req, res) => {
    return await orderControler.updateById(req, res)
})

router.delete("/:orderId", async (req, res) => {
    return await orderControler.deleteById(req, res)

})

export default router