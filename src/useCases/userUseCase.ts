import { Role, User } from "@prisma/client"; // Importa os tipos Role e User do Prisma Client
import { UserRepository } from "../repositories/userRepository"; // Importa o repositório de usuários
import bcrypt from "bcrypt"; // Importa a biblioteca bcrypt para hash de senhas

// Classe que representa os casos de uso relacionados a usuários
export class UserUseCase {
    userRepository = new UserRepository(); // Instância do repositório de usuários

    // Método para buscar um usuário por ID
    // Parâmetro: userId - o ID do usuário a ser buscado
    // Retorna: o usuário encontrado ou null se não encontrado
    async getById(userId: string) {
        const user = await this.userRepository.getById(userId);
        return user;
    }

    // Método para criar um novo usuário
    // Parâmetro: createUserParams - objeto contendo os dados do novo usuário (name, cpf, email, password, phone, role)
    // Retorna: o usuário criado
    async create(createUserParams: {name: string, cpf: string, email: string, password: string, phone: string, role: string}) {
        // TODO: Verificar se existe algum usuário com este email
        // TODO: Verificar se existe algum usuário com este cpf
        // TODO: Verificar se existe algum usuário com este telefone

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
}
