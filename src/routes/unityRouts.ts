import { Router } from 'express';
import { GetUnityByIdController } from '../controllers/unities/getUnityById';
import { GetUsersByUnityController } from '../controllers/users/getUsersByUnity';
import { CreateUnityController } from '../controllers/unities/createUnity';
const routes = Router()

routes.get("/:unityId", (res,req)=>{
  const getUnityByIdController = new GetUnityByIdController()

  return getUnityByIdController.execute(res, req)
})

routes.get("/:unityId/users",(res,req)=>{
  const getUsersByUnityController = new GetUsersByUnityController()

  return getUsersByUnityController.execute(res,req)
})

routes.post("/",(res,req)=>{
  const createUnityController = new CreateUnityController()
  //TODO cadastrar unidades com endereço
  return createUnityController.execute(res,req)
})


export default routes