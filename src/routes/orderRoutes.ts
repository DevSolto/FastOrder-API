
import { Request, Response, Router } from "express";
import { OrderController } from "../controllers/orderController"
import { PrismaClient } from "@prisma/client";

const router = Router()
const orderController = new OrderController()

router.get("", async (req: Request, res: Response) => {
    return await orderController.getAll(req, res)
})

router.post("", async (req: Request, res: Response) => {
    return await orderController.create(req, res)
})

router.get("/:orderId", async (req: Request, res: Response) => {
    return await orderController.getById(req, res)
})

router.put("/:orderId", async (req: Request, res: Response) => {
    return await orderController.updateById(req, res)
})

router.delete("/:orderId", async (req: Request, res: Response) => {
    return await orderController.deleteById(req, res)

})

export default router