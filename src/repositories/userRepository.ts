import { PrismaClient, Role } from "@prisma/client";

// Classe que representa o repositório de usuários, responsável por interagir com o banco de dados
export class UserRepository {
    prisma = new PrismaClient() // Instância do Prisma Client para interagir com o banco de dados

    // Método para buscar um usuário por ID
    // Parâmetro: idUser - o ID do usuário a ser buscado
    // Retorna: o usuário encontrado ou null se não encontrado
    public async getById(idUser: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: idUser // Condição de busca pelo ID do usuário
            }
        });
        return user; // Retorna o usuário encontrado ou null
    }

    // Método para criar um novo usuário
    // Parâmetro: createUserParams - objeto contendo os dados do novo usuário (name, cpf, email, password, phone, role)
    // Retorna: o usuário criado
    public async create(createUserParams: {name: string, cpf: string, email: string, password: string, phone: string, role: Role}) {
        const user = await this.prisma.user.create({
            data: createUserParams // Dados do usuário a ser criado
        });
        return user; // Retorna o usuário criado
    }

    // TODO: Método para buscar todos os usuários
    // Este método deve retornar uma lista de todos os usuários no banco de dados

    // TODO: Método para atualizar um usuário por ID
    // Este método deve atualizar os dados de um usuário específico baseado no seu ID

    // TODO: Método para deletar um usuário por ID
    // Este método deve deletar um usuário específico do banco de dados baseado no seu ID

    // TODO: Adicionar métodos auxiliares se necessário
    // Por exemplo, métodos para buscar usuários por outros critérios como email ou CPF
}
