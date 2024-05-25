import { Router } from "express";
import { WorkController } from "../controllers/workController";
import { PrismaClient } from "@prisma/client";

const router = Router()
const workControler = new WorkController()

router.get("/works", async (req, res) => {
    return await workControler.getAllWorks(req, res)
})

router.get('/:userId/works', async (req, res) => {
    return  await workControler.getWorksByUserId(req, res)
})

router.get("/:userId/works/:unitId", async (req, res) => {
    return await workControler.getById(req, res)
})

router.post("/works", async (req, res) => {
    return await workControler.create(req, res)
})

router.put("/:userId/works/:unitId", async (req, res) => {
    return await workControler.updateById(req, res)
})

router.delete("/:userId/works/:unitId", async (req, res) => {
    return await workControler.deleteById(req, res)
})

export default router