
import { Request, Response, Router } from "express";
import { OrderController } from "../controllers/orderController"

const router = Router()
const orderController = new OrderController()


router.get("/status-count", async (req, res) => {
    return await orderController.amountOrderByStatus(req, res)
})

router.get("/type-count", async (req, res) => {
    return await orderController.amountOfOrderByType(req, res)
})

router.get("/pending-count", async (req, res) => {
    return await orderController.pendingOrdersCountsByUnities(req, res)
})

router.get("/average-processing-time", async (req, res) => {
    return await orderController.averagetimeOfProcess(req, res)
})

router.get("/average-per-day", async (req, res) => {
    return await orderController.average_per_day(req, res)
})

router.get("/error-rate", async (req, res) => {
    return await orderController.error_rate_percentage(req, res)
})

router.get("/delay-rate", async (req, res) => {
    return await orderController.late_rate_percentage(req, res)
})

router.get("/daily-average", async (req, res) => {
    return await orderController.daily_order_rate(req, res)
})

router.get("", async (req, res) => {
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


router.delete("/:orderId", async (req, res) => {
    return await orderController.deleteById(req, res)

})

export default router