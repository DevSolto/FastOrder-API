import { Request, Response, Router } from "express";
import { AuthController } from "../controllers/authController";
const router = Router()
const authController = new AuthController()

router.post("/login", async (req: Request, res: Response) => {
    return await authController.login(req, res)
})

export default router