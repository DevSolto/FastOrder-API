import { PrismaClient, Role } from "@prisma/client";

export class UserRepository {
    prisma = new PrismaClient() // Instância do Prisma Client

    // Método para buscar usuário por ID
    public async getById(idUser: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: idUser
            }
        });
        return user;
    }

    // Método para criar um novo usuário
    public async create(createUserParams: {name: string, cpf: string, email: string, password: string, phone: string, role: Role}) {
        const user = await this.prisma.user.create({
            data: createUserParams
        });
        return user;
    }

    //TODO: Método para buscar todos os usuários

    //TODO: Método para atualizar um usuário por ID

    //TODO: Método para deletar um usuário por ID

    //TODO: Adicionar métodos auxiliares se necessário
}
