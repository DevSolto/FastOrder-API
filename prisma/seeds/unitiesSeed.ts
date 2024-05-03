import { PrismaClient, Tipo } from '@prisma/client';
import { fakerPT_BR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedUnit() {
  const unitiesData = [];
  const types = [Tipo.FORNECEDORA, Tipo.VENDEDORA]
  for (let i = 0; i < 15; i++) {
    unitiesData.push({
      nome: faker.company.name(),
      descricao: faker.lorem.paragraph(),
      tipo:types[Math.round(Math.random())]
    });
  }   

  for (const companyData of unitiesData) {
    const unit = await prisma.unidade.create({
      data: companyData
    });
    console.log(`Usuário criado: ${unit.nome}`);
  }
}   