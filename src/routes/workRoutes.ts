import { Router } from "express";
import { WorkController } from "../controllers/workController";
import { PrismaClient } from "@prisma/client";

const router = Router()
const workControler = new WorkController()

router.get("", async (req, res) => {
    return await workControler.getAllWorks(req, res)
})

router.post("", async (req, res) => {
    return await workControler.create(req, res)
})

router.get("/:userId/:unitId", async (req, res) => {
    return await workControler.getById(req, res)
})

router.put("/:userId/:unitId", async (req, res) => {
    return await workControler.updateById(req, res)
})

router.delete("/:userId/:unitId", async (req, res) => {
    return await workControler.deleteById(req, res)
})

export default router