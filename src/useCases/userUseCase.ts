import { Role, User } from "@prisma/client";
import { UserRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt"
export class UserUseCase{
    userRepository = new UserRepository()

    async getById(userId:string){
        const user = await this.userRepository.getById(userId)
        return user
    }

    async create(createUserParams:{name:string, cpf:string, email:string, password:string, phone:string, role:string}){
        //TODO Verificar se existe algum usuário com este email
        //TODO Verificar se existe algum usuário com este cpf
        //TODO Verificar se existe algum usuário com este telefone

        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
        let userRole:Role
        switch (createUserParams.role.toUpperCase()) {
            case Role.ADMIN.toString():
                userRole = Role.ADMIN
                break;
            case Role.SELLER.toString():
                userRole = Role.SELLER
                break;
            default:
                userRole = Role.SUPPLIER
                break;

        }

        const user = await this.userRepository.create({
            ...createUserParams,
            password:hashedPassword,
            role:userRole
        })

        return user
        

    }
}