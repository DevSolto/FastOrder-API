import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { OrdersUnitiesController } from "../controllers/orderUnitiesController";

const router = Router()
const orderUnitiesController = new OrdersUnitiesController()

router.get("/unities", async (req: Request, res: Response) => {
    return await orderUnitiesController.getAllOrdersUnities(req, res)
})

router.get('/:orderId/unities', async (req: Request, res: Response) => {
    return  await orderUnitiesController.getOrderUnitiesByOrderId(req, res) /* ?: PAssar para a rotas de unities?? */
})

router.get("/:orderId/unities/:unitId", async (req: Request, res: Response) => {
    return await orderUnitiesController.getById(req, res)
})

router.post("/unities", async (req: Request, res: Response) => {
    return await orderUnitiesController.create(req, res)
})

router.put("/:orderId/unities/:unitId", async (req: Request, res: Response) => {
    return await orderUnitiesController.updateById(req, res)
})

router.delete("/:orderId/unities/:unitId", async (req: Request, res: Response) => {
    return await orderUnitiesController.deleteById(req, res)
})

export default router