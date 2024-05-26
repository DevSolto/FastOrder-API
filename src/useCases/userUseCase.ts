import { Role, User } from "@prisma/client"; // Importa os tipos Role e User do Prisma Client
import { UserRepository } from "../repositories/userRepository"; // Importa o repositório de usuários
import bcrypt from "bcrypt"
import { CpfBeingUsed, EmailBeingUsed, PhoneBeingUsed, UserNotFound } from "../errors/userErro";
import { createUserParams, updateUserParams } from "../types";

// Classe que representa os casos de uso relacionados a usuários
export class UserUseCase {
    userRepository = new UserRepository(); // Instância do repositório de usuários

    async getById(userId: string) {
        const user = await this.userRepository.getById(userId);
        return user;
    }

    async getAll() {
        const users = await this.userRepository.getAll()

        return users
    }

    public async getByEmail(emailUser: string) {
        const user = await this.userRepository.getByEmail(emailUser);
        return user; // Retorna o usuário encontrado ou null
    }

    public async getByCpf(cpfUser: string) {
        const user = await this.userRepository.getByCpf(cpfUser);
        return user; // Retorna o usuário encontrado ou null
    }

    public async getByPhone(phoneUser: string) {
        const user = await this.userRepository.getByPhone(phoneUser);
        return user; // Retorna o usuário encontrado ou null
    }

    async create(createUserParams: createUserParams) {
        const userByEmail = await this.userRepository.getByEmail(createUserParams.email)
        if (userByEmail != null) {
            throw new EmailBeingUsed(createUserParams.email)
        }

        const userByCpf = await this.userRepository.getByCpf(createUserParams.cpf)
        if (userByCpf != null) {
            throw new CpfBeingUsed(createUserParams.cpf)
        }

        const userByPhone = await this.userRepository.getByPhone(createUserParams.phone)
        if (userByPhone != null) {
            throw new PhoneBeingUsed(createUserParams.phone)
        }

        // Gera o hash da senha do usuário
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        // Converte o papel do usuário para o tipo Role do Prisma
        let userRole: Role;
        switch (createUserParams.role.toUpperCase()) {
            case Role.ADMIN.toString():
                userRole = Role.ADMIN;
                break;
            case Role.SELLER.toString():
                userRole = Role.SELLER;
                break;
            default:
                userRole = Role.SUPPLIER;
                break;
        }

        // Cria um novo usuário com os parâmetros fornecidos e o hash da senha
        const user = await this.userRepository.create({
            ...createUserParams,
            password: hashedPassword,
            role: userRole
        });

        return user; // Retorna o usuário criado
    }

    async update(userId: string, updateUserParams: updateUserParams) {

        const userExists = await this.userRepository.getById(userId)
        if(userExists == null){
            throw new UserNotFound()
        }

        if (updateUserParams.email) {
            const userByEmail = await this.userRepository.getByEmail(updateUserParams.email)
            if (userByEmail != null) {
                throw new EmailBeingUsed(updateUserParams.email)
            }
        }
        if (updateUserParams.cpf) {

            const userByCpf = await this.userRepository.getByCpf(updateUserParams.cpf)
            if (userByCpf != null) {
                throw new CpfBeingUsed(updateUserParams.cpf)
            }
        }
        if (updateUserParams.phone) {

            const userByPhone = await this.userRepository.getByPhone(updateUserParams.phone)
            if (userByPhone != null) {
                throw new PhoneBeingUsed(updateUserParams.phone)
            }

        }
        if (updateUserParams.password) {
            updateUserParams.password = await bcrypt.hash(updateUserParams.password, 10)
        }

        let userRole 
        
        if (updateUserParams.role) {
            switch (updateUserParams.role.toUpperCase()) {
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
        }

        const user = await this.userRepository.update(userId, {
            ...updateUserParams,
            role:userRole
        })

        return user
    }

    public async delete(userId:string){
        const userExists = await this.userRepository.getById(userId)

        if(userExists == null){
            throw new UserNotFound()
        }

        const userDeleted = await this.userRepository.delete(userId)

        return userDeleted
    }
}
