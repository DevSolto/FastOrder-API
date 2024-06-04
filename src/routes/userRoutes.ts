import { Router } from 'express'
import { UserController } from '../controllers/userController'
import { is } from "../middlewares/auth"

const router = Router()
const userController = new UserController()

router.get('/:userId', async (req, res) => {
  return await userController.getById(req, res)
});

router.get('', async (req, res) => {
  return await userController.getAll(res)
})

router.post('', async (req, res) => {
  return await userController.create(req, res)
})

router.put('/:userId', async (req, res) => {
  return await userController.update(req, res)
})

router.delete('/:userId', async (req, res) => {
  return await userController.delete(req, res)
})

export default router
