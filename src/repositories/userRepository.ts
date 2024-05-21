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
    public async create(createUserParams: 
        { 
            name: string, 
            cpf: string, 
            email: string, 
            password: string, 
            phone: string, 
            role: Role 
        }
    ) {
        const user = await this.prisma.user.create({
            data: createUserParams // Dados do usuário a ser criado
        });
        return user; // Retorna o usuário criado
    }

    public async getAll(){
        const users = await this.prisma.user.findMany()

        return users
    }

    public async update(idUser:string, updateUserParams:
        {
            name?:string,
            email?:string,
            cpf?:string,
            password?:string,
            phone?:string,
            role?:Role
        }
    ){
        const userUpdated = await this.prisma.user.update({
            where:{
                id:idUser
            },
            data:updateUserParams
        })

        return userUpdated
    }
    
    public async delete(userId:string){
        const userDeleted = await this.prisma.user.delete({
            where:{
                id:userId
            }
        })
        return userDeleted
    }