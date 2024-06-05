import { Request, Response, Router } from "express";
import { WorkController } from "../controllers/workController";
import { PrismaClient } from "@prisma/client";

const router = Router()
const workController = new WorkController()

router.get("/works", async (req: Request, res: Response) => {
    return await workController.getAllWorks(req, res)
})

router.get('/:userId/works', async (req: Request, res: Response) => {
    return  await workController.getWorksByUserId(req, res)
})

router.get("/:userId/works/:unitId", async (req: Request, res: Response) => {
    return await workController.getById(req, res)
})

router.post("/works", async (req: Request, res: Response) => {
    return await workController.create(req, res)
})

router.put("/:userId/works/:unitId", async (req: Request, res: Response) => {
    return await workController.updateById(req, res)
})

router.delete("/:userId/works/:unitId", async (req: Request, res: Response) => {
    return await workController.deleteById(req, res)
})

export default router