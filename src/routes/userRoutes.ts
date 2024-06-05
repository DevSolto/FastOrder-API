import { Request, Response, Router } from 'express'
import { UserController } from '../controllers/userController'

const router = Router()
const userController = new UserController()

router.get('/:userId', async (req: Request, res: Response) => {
  return await userController.getById(req, res)
});

router.get('', async (req: Request, res: Response) => {
  return await userController.getAll(res)
})

router.post('', async (req: Request, res: Response) => {
  return await userController.create(req, res)
})

router.put('/:userId', async (req: Request, res: Response) => {
  return await userController.update(req, res)
})

router.delete('/:userId', async (req: Request, res: Response) => {
  return await userController.delete(req, res)
})

export default router
