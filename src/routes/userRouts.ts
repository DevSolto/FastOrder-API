import { Router } from 'express';
import { CreateUserController } from '../controllers/users/createUser';
import { GetUserController } from '../controllers/users/getUser';
import { GetUsersController } from '../controllers/users/getUsers';
import { UpdateUserByIdController } from '../controllers/users/updateUserById';
import { DeleteUserByIdController } from '../controllers/users/deleteUserById';

const routes = Router()

routes.post("/", (req, res)=>{
  const createUserController = new CreateUserController()

  return createUserController.execute(req,res)
})
routes.get("/:param",(req,res)=>{
  const getUserController = new GetUserController()

  return getUserController.execute(req,res)
})
routes.get("/",(req,res)=>{
  const getUsersController = new GetUsersController()

  return getUsersController.execute(res)
})

routes.patch("/:userId",(req, res)=>{
  const updateUserByIdController = new UpdateUserByIdController()

  return updateUserByIdController.execute(req, res)
})

routes.delete("/:userId",(req, res)=>{
  const deleteUserByIdController = new DeleteUserByIdController()

  return deleteUserByIdController.execute(req, res)
})

export default routes