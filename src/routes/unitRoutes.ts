
import { Router } from "express";
import { UnitController } from "../controllers/unitController"

const router = Router()
const unitController = new UnitController()


router.get("/:unitId", async (req, res) => {
    return await unitController.getById(req, res)
})

router.put("/:unitId", async (req, res) => {
    return await unitController.updateById(req, res)
})

router.delete("/:unitId", async (req, res) => {
    return await unitController.deleteById(req, res)
})
export default router