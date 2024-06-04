import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { OrdersUnitiesController } from "../controllers/orderUnitiesController";

const router = Router()
const orderUnitiesControler = new OrdersUnitiesController()

router.get("/unities", async (req, res) => {
    return await orderUnitiesControler.getAllOrdersUnities(req, res)
})

router.get('/:orderId/unities', async (req, res) => {
    return  await orderUnitiesControler.getOrderUnitiesByOrderId(req, res) /* ?: PAssar para a rotas de unities?? */
})

router.get("/:orderId/unities/:unitId", async (req, res) => {
    return await orderUnitiesControler.getById(req, res)
})

router.post("/unities", async (req, res) => {
    return await orderUnitiesControler.create(req, res)
})

router.put("/:orderId/unities/:unitId", async (req, res) => {
    return await orderUnitiesControler.updateById(req, res)
})

router.delete("/:orderId/unities/:unitId", async (req, res) => {
    return await orderUnitiesControler.deleteById(req, res)
})

export default router