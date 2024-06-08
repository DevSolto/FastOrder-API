import { Request, Response, Router } from "express";
import { ProductController } from "../controllers/productController";
import { PrismaClient } from "@prisma/client";
const router = Router()
const productController = new ProductController()

router.get("", async (req: Request, res: Response) => {
    return await productController.getAllProducts(req, res)
})

router.post("", async (req: Request, res: Response) => {
    return await productController.create(req, res)
})

router.get("/:productId", async (req: Request, res: Response) => {
    return await productController.getById(req, res)
})

router.put("/:productId", async (req: Request, res: Response) => {
    return await productController.updateById(req, res)
})

router.delete("/:productId", async (req: Request, res: Response) => {
    return await productController.deleteById(req, res)
})

export default router