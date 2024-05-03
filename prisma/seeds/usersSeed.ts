import { PrismaClient } from '@prisma/client';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { fakerPT_BR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedUsers() {
  const usersData = [];

  for (let i = 0; i < 40; i++) {
    usersData.push({
      cpf: cpfValidator.generate(),
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      senha: faker.internet.password({ length: 20 })
    });
  }

  for (const userData of usersData) {
    const user = await prisma.usuario.create({
      data: userData
    });
    console.log(`Usuário criado: ${user.nome}`);
  }
}