import { Router } from 'express'
import { UserController } from '../controllers/userController'

const router = Router()
const userController = new UserController()

router.get('/:id', async (req, res) => {
  return await userController.getById(req, res)
});

router.get('', async(req, res)=>{
  return await userController.getAll(res)
})

router.post('/', async (req, res) => {
  return await userController.create(req, res)
})

router.patch('/:id', async(req,res)=>{
  return await userController.update(req,res)
})

export default router
