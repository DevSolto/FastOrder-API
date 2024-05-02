import { Router } from 'express';
import { CreateUserController } from '../controllers/users/createUser';
import { GetUserController } from '../controllers/users/getUser';
import { GetUsersController } from '../controllers/users/getUsers';

const routes = Router()

routes.post("/users", (req, res)=>{
  const createUserController = new CreateUserController()

  return createUserController.execute(req,res)
})
routes.get("/users/:param",(req,res)=>{
  const getUserController = new GetUserController()

  return getUserController.execute(req,res)
})
routes.get("/users/",(req,res)=>{
  const getUsersController = new GetUsersController()

  return getUsersController.execute(res)
})

export default routes