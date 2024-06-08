
import { Router } from "express";
import { OrderController } from "../controllers/orderController"

const router = Router()
const orderControler = new OrderController()

router.get("/status-count", async (req, res) => {
    return await orderControler.amountOrderByStatus(req, res)
})

router.get("/type-count", async (req, res) => {
    return await orderControler.amountOfOrderByType(req, res)
})

router.get("/pending-count", async (req, res) => {
    return await orderControler.pendingOrdersCountsByUnities(req, res)
})

router.get("/average-processing-time", async (req, res) => {
    return await orderControler.averagetimeOfProcess(req, res)
})

router.get("/average-per-day", async (req, res) => {
    return await orderControler.average_per_day(req, res)
})

router.get("/error-rate", async (req, res) => {
    return await orderControler.error_rate_percentage(req, res)
})

router.get("/delay-rate", async (req, res) => {
    return await orderControler.late_rate_percentage(req, res)
})

router.get("/daily-average", async (req, res) => {
    return await orderControler.daily_order_rate(req, res)
})

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