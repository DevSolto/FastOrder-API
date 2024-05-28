
import { Router } from "express";
import { UnitController } from "../controllers/unitController"
import { PrismaClient } from "@prisma/client";

const router = Router()
const unitControler = new UnitController()

// router.get("", async (req, res) => {
//     return await unitControler.getAllUnits(req, res)
// })

// router.post("", async (req, res) => {
//     return await unitControler.create(req, res)
// })

// router.get("/:id", async (req, res) => {
//     return await unitControler.getById(req, res)
// })

// router.put("/:id", async (req, res) => {
//     return await unitControler.updateById(req, res)
// })

// router.delete("/:id", async (req, res) => {
//     return await unitControler.deleteById(req, res)

// })

export default router