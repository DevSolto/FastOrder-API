import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { PrismaClient } from "@prisma/client";
const router = Router()
const productControler = new ProductController()

router.get("", async (req, res) => {
    return await productControler.getAllProducts(req, res)
})

router.post("", async (req, res) => {
    return await productControler.create(req, res)
})

router.get("/:id", async (req, res) => {
    return await productControler.getById(req, res)
})

router.put("/:id", async (req, res) => {
    return await productControler.updateById(req, res)
})

router.delete("/:id", async (req, res) => {
    return await productControler.deleteById(req, res)
})

export default router