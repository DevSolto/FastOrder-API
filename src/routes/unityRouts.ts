import { Router } from 'express';
import { GetUnityByIdController } from '../controllers/unities/getUnityById';
import { GetUsersByUnityController } from '../controllers/users/getUsersByUnity';
const routes = Router()

routes.get("/:unityId", (res,req)=>{
  const getUnityByIdController = new GetUnityByIdController()

  return getUnityByIdController.execute(res, req)
})

routes.get("/:unityId/users",(res,req)=>{
  const getUsersByUnityController = new GetUsersByUnityController()

  return getUsersByUnityController.execute(res,req)
})


export default routes