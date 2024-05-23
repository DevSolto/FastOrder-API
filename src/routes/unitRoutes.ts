import { Router } from 'express'
import { UnitController } from '../controllers/unitController';

const router = Router()
const unitController = new UnitController()

router.post('', async (req, res) => {
  return await unitController.create(req, res)
})

export default router